import { NextRequest } from "next/server";
import { APIError } from "../../../../lib/error/api_error";
import { Authorize } from "../../../../lib/route_method";
import { validateRequest } from "../../../../lib/validate_request";
import { AAACECRole } from "../../../domain/aaacec_roles";
import { BoomDTO } from "./boom.dto";
import { BoomRepository } from "../../../repositories/boom_repository";
import { DataError } from "../../../../lib/error/data_error";
import { Boom } from "../../../domain/boom";

class BoomController {
  @Authorize([AAACECRole.ADMIN])
  static async POST(req: Request) {
    const body = await req.json();
    try {
      const dto = await validateRequest(
        body,
        BoomDTO.schema,
        BoomDTO.fromObject
      );
      await BoomRepository.addBoom(Boom.fromDTO(dto));
      return Response.json(
        { message: "Boom added successfully" },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof APIError) {
        return error.failMessage();
      }
      if (error instanceof DataError) {
        return Response.json({ message: error.message }, { status: 500 });
      }
    }
  }

  @Authorize([AAACECRole.ADMIN])
  static async GET(_req: NextRequest) {
    try {
      const booms = await BoomRepository.getAllBooms();
      return Response.json({ booms: booms }, { status: 200 });
    } catch (error) {
      if (error instanceof APIError) {
        return error.failMessage();
      }
    }
  }
}

export async function POST(request: Request) {
  return await BoomController.POST(request);
}

export async function GET(request: NextRequest) {
  return await BoomController.GET(request);
}
