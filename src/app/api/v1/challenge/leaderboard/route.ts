import { NextRequest } from "next/server";
import { ChallengeRepository } from "../../../../repositories/challenge_repository";
import { APIError } from "../../../../../lib/error/api_error";
import { Authorize } from "../../../../../lib/route_method";
import { AAACECRole } from "../../../../domain/aaacec_roles";

class LeaderboardController {
  @Authorize([AAACECRole.ADMIN])
  static async GET(req: NextRequest) {
    if (req.nextUrl.searchParams.has("tid")) {
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
    throw new APIError("Please provide tid as a query parameter.", 400);
  }
}

export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  return LeaderboardController.GET(request);
}
