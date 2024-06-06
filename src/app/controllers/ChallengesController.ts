import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

interface Challenges {
  numericId: number;
  description: string;
}

export default class ChallengesController {
  static async getChallenges(): Promise<Challenges[]> {
    let challenges: Challenges[];

    try {
      const response: AxiosResponse = await axios.get(
        "/api/v1/challenge?partyId=sao_login"
      );
      challenges = response.data.challenges.map((challenge: Challenges) => ({
        numericId: challenge.numericId,
        description: challenge.description,
      }));
    } catch (e) {
      return [];
    }

    return challenges;
  }
}
