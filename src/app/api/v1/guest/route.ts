import { Authorize } from "../../../../lib/route_method";
import { AAACECRole } from "../../../domain/aaacec_roles";
import { GuestRepository } from "../../../repositories/guest_repository";

class GenerateGuestController {
  @Authorize([AAACECRole.ADMIN, AAACECRole.CONCIERGE])
  static async POST(_request: Request) {
    const guestName = await GuestRepository.generateGuest();
    return Response.json({ name: guestName }, { status: 200 });
  }

  @Authorize([AAACECRole.ADMIN])
  static async DELETE(_request: Request) {
    await GuestRepository.clearGuests();
    return Response.json({ message: "All guests cleared!" }, { status: 200 });
  }
}

export async function POST(request: Request) {
  return GenerateGuestController.POST(request);
}

export async function DELETE(request: Request) {
  return GenerateGuestController.DELETE(request);
}
