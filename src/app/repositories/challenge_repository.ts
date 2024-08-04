import moment from "moment";
import { firestore } from "../../lib/data/firestore";
import { DataError } from "../../lib/error/data_error";
import { Challenge } from "../domain/challenge";
import { ChallengeHistory } from "../domain/challenge_history";

export class ChallengeRepository {
  static async addChallenge(challenge: Challenge) {
    await firestore.doc(`challenges/${challenge.id}`).set({
      description: challenge.description,
      points: challenge.points,
      numericId: challenge.numericId,
      tags: challenge.tags,
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
        data.tags,
        data.partyId
      );
    });
  }

  static async scoreGuest(guestId: string, score: number): Promise<number> {
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
      score: data.score + score,
    });

    return data.score + score;
  }

  static async getAllScores() {
    const guests = await firestore.collection("guest/list/guests").get();
    return guests.docs
      .map((doc) => {
        const data = doc.data();
        if (!data.score) {
          data.score = 0;
        }
        return {
          id: doc.id,
          name: data.name,
          score: data.score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .map((doc, listIndex: number) => ({
        position: listIndex + 1,
        id: doc.id,
        name: doc.name,
        score: doc.score,
      }));
  }


  static async addChallengeHistory(challenge_history: ChallengeHistory) {
    await firestore.doc(`challenges_history/${challenge_history.user}-${challenge_history.guest}-${challenge_history.ts}`).set({
      guest: challenge_history.guest,
      user: challenge_history.user,
      timestamp: challenge_history.ts,
    });
  }
}
