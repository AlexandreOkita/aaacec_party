import { firestore } from "../../lib/data/firestore";
import { DataError } from "../../lib/error/data_error";
import { Challenge } from "../domain/challenge";

export class ChallengeRepository {
  static async addChallenge(challenge: Challenge) {
    await firestore.doc(`challenges/${challenge.id}`).set({
      description: challenge.description,
      points: challenge.points,
      numericId: challenge.numericId,
      partyId: challenge.partyId,
    });
  }

  static async getChallenges(partyId: string) {
    const challenges = await firestore
      .collection("challenges")
      .where("partyId", "==", partyId)
      .get();
    return challenges.docs.map((doc) => {
      const data = doc.data();
      return new Challenge(
        doc.id,
        data.description,
        data.points,
        data.numericId,
        data.partyId
      );
    });
  }

  static async scoreGuest(guestId: string) {
    const guest = await firestore.doc(`guest/list/guests/${guestId}`).get();
    if (!guest.exists) {
      throw new DataError("GuestId not found", "guests");
    }
    const data = guest.data()!;

    if (!data.score) {
      data.score = 0;
    }

    await firestore.doc(`guest/list/guests/${guestId}`).set({
      ...data,
      score: data.score + 1,
    });
  }
}
