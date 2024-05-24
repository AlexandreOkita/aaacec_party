import { NextRequest } from "next/server";
import { Authorize } from "../../../../../lib/route_method";
import { AAACECRole } from "../../../../domain/aaacec_roles";
import { GuestRepository } from "../../../../repositories/guest_repository";
import { validateRequest } from "../../../../../lib/validate_request";
import { PutNamesDTO } from "./names.dto";
import { APIError } from "../../../../../lib/error/api_error";

class NamesController {
  @Authorize([AAACECRole.ADMIN])
  static async PUT(request: Request) {
    try {
      const body = await request.json();
      const dto = await validateRequest(
        body,
        PutNamesDTO.schema,
        PutNamesDTO.fromObject
      );
      await GuestRepository.setAvailableNames(dto.names);
      return Response.json({ message: "Names updated" }, { status: 200 });
    } catch (error) {
      if (error instanceof APIError) {
        return Response.json(
          { message: error.message },
          { status: error.code }
        );
      }
      console.log(error);
      return Response.json({ message: "An error occurred" }, { status: 500 });
    }
  }

  @Authorize([AAACECRole.ADMIN, AAACECRole.CONCIERGE, AAACECRole.WORKER])
  static async GET(_request: Request) {
    const names = await GuestRepository.getAvailableNames();
    return Response.json({ names: names }, { status: 200 });
  }
}

export async function PUT(request: Request) {
  return await NamesController.PUT(request);
}

export async function GET(request: NextRequest) {
  return await NamesController.GET(request);
}
