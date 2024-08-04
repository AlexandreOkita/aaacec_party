import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

interface Challenges {
  numericId: number;
  description: string;
  tags: string[];
  points: number;
}

export default class ChallengesController {
  static async getChallenges(): Promise<Challenges[]> {
    let challenges: Challenges[];

    try {
      const response: AxiosResponse = await axios.get(
        "/api/v1/challenge?partyId=corotebreak"
      );
      challenges = response.data.challenges.map((challenge: Challenges) => ({
        numericId: challenge.numericId,
        description: challenge.description,
        tags: challenge.tags,
        points: challenge.points
      }));
    } catch (e) {
      return [];
    }

    return challenges;
  }
}
