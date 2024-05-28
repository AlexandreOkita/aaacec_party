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
      const response: AxiosResponse = await axios.get(
        "/api/v1/challenge/leaderboard"
      );
      leaderboard = response.data.scores.map((score: ScoreResponse) => ({
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
