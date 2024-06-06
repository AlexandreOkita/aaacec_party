import { APIError } from "../../../../../lib/error/api_error";
import { DataError } from "../../../../../lib/error/data_error";
import { Authorize } from "../../../../../lib/route_method";
import { validateRequest } from "../../../../../lib/validate_request";
import { AAACECRole } from "../../../../domain/aaacec_roles";
import { ChallengeRepository } from "../../../../repositories/challenge_repository";
import { AddScoreDTO } from "./score.dto";

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
      await ChallengeRepository.scoreGuest(dto.guest);
      return Response.json({ message: "Score added" }, { status: 200 });
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
}

export function POST(req: Request) {
  return ScoreController.POST(req);
}
