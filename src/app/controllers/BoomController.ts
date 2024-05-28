import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

export interface ScheduledBoom {
  name: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export default class BoomController {
  static async getNextScheduledBoom(
    token: string
  ): Promise<ScheduledBoom | null> {
    let scheduledBoom: ScheduledBoom;

    try {
      const response: AxiosResponse = await axios.get(
        "/api/v1/boom/schedule?partyId=sao_login",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.boomSchedules.length === 0) {
        return null;
      } else {
        scheduledBoom = {
          name: response.data.boomSchedules[0].name,
          startDate: response.data.boomSchedules[0].startDate,
          endDate: response.data.boomSchedules[0].endDate,
          imageUrl: response.data.boomSchedules[0].imageUrl,
        };
      }
    } catch (e) {
      return null;
    }

    return scheduledBoom;
  }
}
