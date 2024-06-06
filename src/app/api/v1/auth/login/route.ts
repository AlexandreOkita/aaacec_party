import { AuthRepository } from "../../../../repositories/auth_repository";

class LoginRoute {
  static async POST(request: Request) {
    const body = await request.json();
    const username = body.username;
    const password = body.password;

    const token = await AuthRepository.login(username, password);
    return Response.json({ token,  }, { status: 200 });
  }
}

export function POST(request: Request) {
  return LoginRoute.POST(request);
}
