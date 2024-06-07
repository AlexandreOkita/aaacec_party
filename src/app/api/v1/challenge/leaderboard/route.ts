import { ChallengeRepository } from "../../../../repositories/challenge_repository";

class LeaderboardController {
  static async GET(_request: Request) {
    const scores = await ChallengeRepository.getAllScores();
    return Response.json(
      { scores: scores },
      {
        status: 200,
        headers: {
          "Cache-Control": "max-age=0, s-maxage=0",
          "CDN-Cache-Control": "max-age=0, s-maxage=0",
          "Vercel-CDN-Cache-Control": "max-age=0, s-maxage=0",
        },
      }
    );
  }
}

export const fetchCache = 'force-no-store';

export async function GET(request: Request) {
  return LeaderboardController.GET(request);
}
