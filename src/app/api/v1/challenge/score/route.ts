import { JWTSigner } from "@/lib/jwt/jwt_signer";
import { APIError } from "../../../../../lib/error/api_error";
import { DataError } from "../../../../../lib/error/data_error";
import { Authorize } from "../../../../../lib/route_method";
import { validateRequest } from "../../../../../lib/validate_request";
import { AAACECRole } from "../../../../domain/aaacec_roles";
import { ChallengeRepository } from "../../../../repositories/challenge_repository";
import { AddScoreDTO } from "./score.dto";
import { ChallengeHistory } from "@/app/domain/challenge_history";

class ScoreController {
  @Authorize([AAACECRole.ADMIN, AAACECRole.WORKER])
  static async POST(req: Request) {
    try {
      const body = await req.json();
      const dto = await validateRequest(
        body,
        AddScoreDTO.schema,
        AddScoreDTO.fromObject
      );
      const payload = await ScoreController.getUsernameFromToken(req);
      const currentScore = await ChallengeRepository.scoreGuest(
        dto.guest,
        dto.score
      );
      await ChallengeRepository.addChallengeHistory(new ChallengeHistory(dto.guest, payload.username));
      return Response.json(
        { message: `Score added! Current score: ${currentScore}` },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof APIError) {
        return error.failMessage();
      }
      if (error instanceof DataError) {
        return Response.json({ message: error.message }, { status: 500 });
      }
      console.log(error);
      return Response.json({ message: "Unknown error" }, { status: 500 });
    }
  }

  private static async getUsernameFromToken(req: Request) {
    const auth_token = req.headers.get("Authorization")!;
    const token = auth_token.replace("Bearer ", "");
    const payload = await JWTSigner.verify(token);
    return payload;
  }
}

export function POST(req: Request) {
  return ScoreController.POST(req);
}
