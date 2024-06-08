import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

export interface Score {
  position: number;
  login: string;
  name: string;
  score: number;
}

interface ScoreResponse {
  position: number;
  id: string;
  name: string;
  score: number;
}

export default class LeaderboardController {
  static async getLeaderboard(): Promise<Score[]> {
    let leaderboard: Score[];

    try {
      const response: Response = await fetch(
        `/api/v1/challenge/leaderboard?tid=${Date.now()}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      leaderboard = data.scores.map((score: ScoreResponse) => ({
        position: score.position,
        login: score.id,
        name: score.name,
        score: score.score,
      }));
    } catch (e) {
      return [];
    }

    return leaderboard;
  }
}
