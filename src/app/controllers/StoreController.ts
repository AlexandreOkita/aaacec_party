import axios, { AxiosError, AxiosResponse } from "axios";

interface StoreItem {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export default class StorageController {
  static async getStoreItems(token: string): Promise<StoreItem[]> {
    let items: StoreItem[];

    try {
      const response: AxiosResponse = await axios.get(
        "/api/v1/store?partyId=corotebreak",
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        }
      );
      items = response.data.storeItems.map((item: StoreItem) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        name: item.name,
        price: item.price,
      }));
    } catch (e) {
      return [];
    }

    return items;
  }

  static async buyItem(token: string, itemId: string, name: string, number: number): Promise<number> {
    let newScore: number;

    try {
      const response: AxiosResponse = await axios.post(
        "/api/v1/store/purchase",
        {
          itemId,
          name,
          number,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      newScore = response.data.score;
    } catch (e: any) {
      if (e?.response?.status === 403) {
        return -2;
      }
      return -1;
    }

    return newScore;
  }
}
