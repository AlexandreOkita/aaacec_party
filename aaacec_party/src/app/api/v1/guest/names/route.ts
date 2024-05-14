import { NextRequest } from "next/server";
import { Authorize } from "../../../../../lib/route_method";
import { AAACECRole } from "../../../../domain/aaacec_roles";
import { GuestRepository } from "../../../../repositories/guest_repository";

class NamesController {
  @Authorize([AAACECRole.ADMIN])
  static async PUT(request: Request) {
    const body = await request.json();
    await GuestRepository.setAvailableNames(body.names);
    return Response.json({ message: "Names updated" }, { status: 200 });
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
