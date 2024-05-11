import { AuthRepository } from "../../../../repositories/auth_repository";

export async function POST(request: Request) {
  const body = await request.json();
  const username = body.username;
  const password = body.password;

  try {
    const token = await AuthRepository.register(username, password);
    return Response.json({ token }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'username already exists!' }, { status: 400 });
  }
}
