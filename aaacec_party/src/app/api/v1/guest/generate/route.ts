import { GuestRepository } from "../../../../repositories/guest_repository";

export async function POST() {
  const guestName = await GuestRepository.generateGuest();
  return new Response(JSON.stringify({name: guestName}));
}