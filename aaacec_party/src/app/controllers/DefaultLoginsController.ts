import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

interface DefaultLogin {
  imgUrl: string;
  login: string;
}

export default class DefaultLoginController {
  static async getDefaultLogins(token: string): Promise<DefaultLogin[]> {
    let defaultLogins: DefaultLogin[];

    try {
      const response: AxiosResponse = await axios.get("/api/v1/guest/names", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      defaultLogins = response.data.names.map(
        (defaultLogin: { name: string; imgUrl: string }) => ({
          login: defaultLogin.name,
          imgUrl: defaultLogin.imgUrl,
        })
      );
    } catch (e) {
      return [];
    }

    return defaultLogins;
  }
}
