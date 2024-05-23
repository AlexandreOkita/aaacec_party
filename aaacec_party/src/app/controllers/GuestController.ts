import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

interface guestDataInterface {
  guestLogin: string | null;
}

export default class GuestController {
  static async generateGuestLogin(token: string): Promise<guestDataInterface> {
    let guestData: guestDataInterface;

    try {
      const response: AxiosResponse = await axios.post(
        "/api/v1/guest/",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      guestData = {
        guestLogin: response.data.name,
      };
    } catch (e) {
      return { guestLogin: null };
    }

    return guestData;
  }

  static async scoreGuest(
    token: string,
    login: string,
    id: number
  ): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.post(
        "/api/v1/challenge/score/",
        {
          name: login,
          number: id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (e) {
      return false;
    }

    return true;
  }
}
