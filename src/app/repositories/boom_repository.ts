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
    await firestore.doc(`boom_schedules/${boomSchedule.boomId}`).set({
      boomId: boomSchedule.boomId,
      partyId: boomSchedule.partyId,
      name: boomSchedule.name,
      startDate: boomSchedule.startDate,
      endDate: boomSchedule.endDate,
    });
  }

  static async getBoomSchedules(partyId: string): Promise<BoomSchedule[]> {
    const scheduleDocs = await firestore
      .collection("boom_schedules")
      .where("partyId", "==", partyId)
      .where("startDate", ">", moment().tz("America/Sao_Paulo"))
      .get();

    const schedules = scheduleDocs.docs.map((doc) => {
      const data = doc.data();
      return new BoomSchedule(
        data.name,
        data.partyId,
        data.startInSeconds,
        data.duration,
        data.startDate,
        data.endDate
      );
    });

    return schedules.sort((a, b) => a.startDate.diff(b.startDate));
  }
}
