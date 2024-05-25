import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

export interface Score {
  login: string;
  name: string;
  score: number;
}

interface ScoreResponse {
  id: string;
  name: string;
  score: number;
}

export default class LeaderboardController {
  static async getLeaderboard(): Promise<Score[]> {
    let leaderboard: Score[];

    try {
      const response: AxiosResponse = await axios.get(
        "/api/v1/challenge/leaderboard"
      );
      leaderboard = response.data.scores.map((score: ScoreResponse) => ({
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
