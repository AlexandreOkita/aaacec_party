import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

interface loginDataInterface {
  token: string;
}

export default class LoginController {
  static async login(username: string, password: string): Promise<number> {
    let loginData: loginDataInterface;

    try {
      const response: AxiosResponse = await axios.post("/api/v1/auth/login", {
        username,
        password,
      });
      loginData = {
        token: response.data.token,
      };
    } catch (e) {
      return 401;
    }

    const newToken = loginData.token;
    Cookies.set("token", newToken);
    return 200;
  }

  static logOut(router: any): void {
    Cookies.remove("token");
    router.replace("/");
  }
}
