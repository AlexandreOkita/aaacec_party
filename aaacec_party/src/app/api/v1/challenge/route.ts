import { APIError } from "../../../../lib/error/api_error";
import { validateRequest } from "../../../../lib/validate_request";
import { Challenge } from "../../../domain/challenge";
import { ChallengeRepository } from "../../../repositories/challenge_repository";
import { NewChallengeDTO } from "./challenge.dto";

class ChallengeController {
  // @Authorize([AAACECRole.ADMIN])
  static async POST(req: Request) {
    try {
      const dto = validateRequest(
        req,
        NewChallengeDTO.schema,
        NewChallengeDTO.fromObject
      );
      const id = dto.partyId + dto.numericId;
      await ChallengeRepository.addChallenge(
        new Challenge(
          id,
          dto.description,
          dto.points,
          dto.numericId,
          dto.partyId
        )
      );
      return Response.json({ message: "Challenge POST" }, { status: 200 });
    } catch (error) {
      if (error instanceof APIError) {
        return error.failMessage();
      }
    }
  }
}

export async function POST(request: Request) {
  return await ChallengeController.POST(request);
}
