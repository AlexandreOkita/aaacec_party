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
        "/api/v1/challenge?partyId=025corotebreak"
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

  static async solveChallenge(token: string, guestId: number, score: number, guestName: string = "025corotebreak"): Promise<AxiosResponse> {
    const response: AxiosResponse = await axios.post(
      "/api/v1/challenge/score",
      {
        name: guestName,
        number: guestId,
        score,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      }
    );

    return response;
  }
}
