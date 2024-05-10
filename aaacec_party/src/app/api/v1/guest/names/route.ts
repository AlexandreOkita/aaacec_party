import { GuestRepository } from "../../../../repositories/guest_repository";

export async function PUT(request: Request) {
  const body = await request.json();
  await GuestRepository.setAvailableNames(body.names);
  return new Response("Names set successfully");
}

export async function GET() {
  const names = await GuestRepository.getAvailableNames();
  return new Response(JSON.stringify(names));
}
