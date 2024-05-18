import { firestore } from "../../lib/data/firestore";

export class GuestRepository {
  static async setAvailableNames(names: { name: string; imgUrl: string }[]) {
    firestore.doc("guest/names").set({ names });
  }

  static async getAvailableNames(): Promise<string[]> {
    const doc = await firestore.doc("guest/names").get();

    if (!doc.data()) {
      return [];
    }

    return doc.data()!.names;
  }

  static async generateGuest(): Promise<string> {
    const doc = await firestore.doc("guest/names").get();

    if (!doc.data()) {
      throw new Error("No names available");
    }

    // Cria um documento com um nome disponível, o nome deve serguir o formato: nome-<número>
    // Caso o nome já exista, incrementa o número até encontrar um nome disponível
    // O número inicial é 0

    const names = (doc.data()!.names as { name: string; imgUrl: string }[]).map(
      (e) => e.name
    );

    const snapshot = await firestore.collection("guest/list/guests").get();
    const currentGuests = snapshot.docs.map((doc) => doc.id);

    const nameCount = new Map<string, number>();

    for (const name of names) {
      nameCount.set(name, 0);
    }

    for (const currentGuest of currentGuests) {
      const currentGuestName = currentGuest.split("-")[0];
      if (!nameCount.has(currentGuestName)) {
        nameCount.set(currentGuestName, 0);
      }
      nameCount.set(currentGuestName, nameCount.get(currentGuestName)! + 1);
    }

    let leastUsedName = "";
    let minCount = Number.MAX_VALUE;

    for (const name of names) {
      if (nameCount.get(name)! < minCount) {
        leastUsedName = name;
        minCount = nameCount.get(name)!;
      }
    }

    this._addGuest(leastUsedName, minCount);
    return `${leastUsedName}-${minCount}`;
  }

  static async clearGuests() {
    const snapshot = await firestore.collection("guest/list/guests").get();
    for (const doc of snapshot.docs) {
      await doc.ref.delete();
    }
  }

  private static async _addGuest(name: string, count: number) {
    await firestore.doc(`guest/list/guests/${name}-${count}`).set({ name });
  }
}
