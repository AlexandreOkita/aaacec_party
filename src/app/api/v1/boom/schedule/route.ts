import { NextRequest } from "next/server";
import { APIError } from "../../../../../lib/error/api_error";
import { DataError } from "../../../../../lib/error/data_error";
import { Authorize } from "../../../../../lib/route_method";
import { validateRequest } from "../../../../../lib/validate_request";
import { AAACECRole } from "../../../../domain/aaacec_roles";
import { BoomRepository } from "../../../../repositories/boom_repository";
import { BoomScheduleDTO } from "./boom_schedule.dto";
import { BoomSchedule } from "../../../../domain/boom_schedule";

class BoomSchedulerController {
  @Authorize([AAACECRole.ADMIN])
  static async GET(req: NextRequest) {
    if (req.nextUrl.searchParams.has("partyId")) {
      const partyId = req.nextUrl.searchParams.get("partyId");
      const boomSchedules = await BoomRepository.getBoomSchedules(partyId!);
      return Response.json({ boomSchedules }, { status: 200 });
    }
    throw new APIError("Please provide a partyId as a query parameter.", 400);
  }

  @Authorize([AAACECRole.ADMIN])
  static async POST(req: Request) {
    const body = await req.json();
    try {
      const dto = await validateRequest(
        body,
        BoomScheduleDTO.schema,
        BoomScheduleDTO.fromObject
      );
      await BoomRepository.scheduleBoom(BoomSchedule.fromDTO(dto));
      return Response.json(
        { message: "Boom scheduled successfully" },
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
}

export async function POST(request: Request) {
  return await BoomSchedulerController.POST(request);
}

export async function GET(request: NextRequest) {
  return await BoomSchedulerController.GET(request);
}
