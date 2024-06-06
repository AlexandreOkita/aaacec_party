import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { JWTSigner } from "@/lib/jwt/jwt_signer";
import crypto from "crypto";

interface loginDataInterface {
  token: string;
}

interface loginResponse {
  status: number;
  role: string;
}

export default class LoginController {
  static async login(
    username: string,
    password: string
  ): Promise<loginResponse> {
    let loginData: loginDataInterface;

    const salt = process.env.AUTH_SALT ?? "salt";
    const hash = crypto
      .pbkdf2Sync(password, salt, 100, 64, "sha512")
      .toString("hex");
    try {
      const response: AxiosResponse = await axios.post("/api/v1/auth/login", {
        username,
        password: hash,
      });
      loginData = {
        token: response.data.token,
      };
    } catch (e) {
      return { status: 200, role: "" };
    }

    const newToken = loginData.token;
    Cookies.set("token", newToken);
    const tokenInformation = await JWTSigner.verify(loginData.token);
    const role = tokenInformation.role;

    return { status: 200, role };
  }

  static logOut(router: any): void {
    Cookies.remove("token");
    router.replace("/");
  }
}
