import { firestore } from "../../lib/data/firestore";
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
}
