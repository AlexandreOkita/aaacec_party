import { ChallengeRepository } from "../../../../repositories/challenge_repository";

class LeaderboardController {
  static async GET(_request: Request) {
    const scores = await ChallengeRepository.getAllScores();
    return Response.json({ scores: scores }, { status: 200 });
  }
}

export async function GET(request: Request) {
  return LeaderboardController.GET(request);
}
