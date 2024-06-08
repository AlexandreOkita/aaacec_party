import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

interface guestDataInterface {
  guestLogin: string | null;
  guestOriginalName: string;
  guestOriginalNumber: number;
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
        guestOriginalName: response.data.originalName,
        guestOriginalNumber: response.data.originalNumber,
      };
    } catch (e) {
      return {
        guestLogin: null,
        guestOriginalName: "",
        guestOriginalNumber: 0,
      };
    }

    return guestData;
  }

  static async scoreGuest(
    token: string,
    login: string,
    id: number,
    _score: number = 1
  ): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.post(
        "/api/v1/challenge/score/",
        {
          name: login,
          number: id,
          score: _score,
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
