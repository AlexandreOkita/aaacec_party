import { firestore } from "../../lib/data/firestore";
import { DataError } from "../../lib/error/data_error";
import { PermissionError } from "../../lib/error/permission_error";
import { Purchase } from "../domain/purchase";
import { StoreItem } from "../domain/store_item";

export class StoreRepository {
  static async addStoreItem(storeItem: StoreItem): Promise<void> {
    await firestore.doc(`store/${storeItem.id}`).set({
      name: storeItem.name,
      price: storeItem.price,
      imageUrl: storeItem.imageUrl,
      partyId: storeItem.partyId,
    });
  }

  static async getStoreItem(id: string): Promise<StoreItem> {
    const item = await firestore.doc(`store/${id}`).get();
    if (!item.exists) {
      throw new DataError("Item not found", "store");
    }
    const data = item.data()!;
    return new StoreItem(id, data.description, data.price, data.imageUrl, data.partyId);
  }

  static async getItems(partyId: string) {
    const items = await firestore
      .collection("store")
      .where("partyId", "==", partyId)
      .get();
    return items.docs.map((doc) => {
      const data = doc.data();
      return new StoreItem(doc.id, data.name, data.price, data.imageUrl, data.partyId);
    });
  }

  static async buyItem(guestId: string, item: StoreItem) {
    const guest = await firestore.doc(`guest/list/guests/${guestId}`).get();
    if (!guest.exists) {
      throw new DataError("GuestId not found", "guests");
    }
    const data = guest.data()!;

    if (!data.score) {
      data.score = 0;
    }

    if (data.score < item.price) {
      throw new PermissionError("Not enough points", "guests");
    }

    await firestore.doc(`guest/list/guests/${guestId}`).set({
      ...data,
      score: data.score - item.price,
    });

    return data.score - item.price;
  }

  static async addPurchase(purchase: Purchase) {
    await firestore
      .doc(`purchases/${purchase.user}-${purchase.guest}-${purchase.ts}`)
      .set({
        guest: purchase.guest,
        user: purchase.user,
        itemId: purchase.itemId,
        timestamp: purchase.ts,
      });
  }
}
