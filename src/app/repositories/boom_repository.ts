import moment from "moment";
import { firestore } from "../../lib/data/firestore";
import { DataError } from "../../lib/error/data_error";
import { Boom } from "../domain/boom";
import { BoomSchedule } from "../domain/boom_schedule";

export class BoomRepository {
  static async addBoom(boom: Boom) {
    const doc = await firestore.doc(`booms/${boom.name}`).get();
    if (doc.exists) {
      throw new DataError("Boom already exists", "booms");
    }
    await firestore.doc(`booms/${boom.id}`).set({
      imageURL: boom.imageURL,
      name: boom.name,
      partyId: boom.partyId,
    });
  }

  static async getAllBooms(): Promise<Boom[]> {
    const booms = await firestore.collection("booms").get();
    return booms.docs.map((doc) => {
      const data = doc.data();
      return new Boom(data.imageURL, data.name, data.partyId);
    });
  }

  static async scheduleBoom(boomSchedule: BoomSchedule) {
    const boomDoc = await firestore.doc(`booms/${boomSchedule.boomId}`).get();
    if (!boomDoc.exists) {
      throw new DataError("Boom does not exist", "booms");
    }

    await firestore.doc(`boom_schedules/${boomSchedule.boomId}`).set({
      boomId: boomSchedule.boomId,
      partyId: boomSchedule.partyId,
      imageUrl: boomDoc.data()!.imageURL,
      name: boomSchedule.name,
      startDate: new Date(
        moment(boomSchedule.startDate)
          .tz("America/Sao_Paulo")
          .format("YYYY/MM/DD HH:mm:ss")
      ),
      endDate: new Date(
        moment(boomSchedule.endDate)
          .tz("America/Sao_Paulo")
          .format("YYYY/MM/DD HH:mm:ss")
      ),
    });
  }

  static async getBoomSchedules(partyId: string): Promise<BoomSchedule[]> {
    const scheduleDocs = await firestore
      .collection("boom_schedules")
      .where("partyId", "==", partyId)
      // Subtract 3 seconds to guarantee that frontend polling won't get a race condition with timer
      .where(
        "startDate",
        ">",
        new Date(
          moment()
            .subtract(3000)
            .tz("America/Sao_Paulo")
            .format("YYYY/MM/DD HH:mm:ss")
        )
      )
      .get();

    const schedules = scheduleDocs.docs.map((doc) => {
      const data = doc.data();
      return new BoomSchedule(
        data.name,
        data.partyId,
        data.startInSeconds,
        data.duration,
        data.imageUrl,
        this._firestoreDateToTimezone(data.startDate),
        this._firestoreDateToTimezone(data.endDate)
      );
    });

    return schedules.sort((a, b) =>
      moment(a.startDate).diff(moment(b.startDate))
    );
  }

  static _firestoreDateToTimezone(date: any) {
    return moment(date.toDate()).tz("America/Sao_Paulo");
  }
}
