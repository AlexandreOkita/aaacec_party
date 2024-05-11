import { AuthRepository } from "../../../../repositories/auth_repository";

export async function POST(request: Request) {
  const body = await request.json();
  const username = body.username;
  const password = body.password;

  const token = await AuthRepository.login(username, password);
  return Response.json({ token }, { status: 200 });
}
