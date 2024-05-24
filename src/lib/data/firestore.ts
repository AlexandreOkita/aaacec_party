import { Firestore } from "@google-cloud/firestore";

export const firestore = new Firestore({
  projectId: "aaacecparty",
  keyFilename: "src/lib/data/firebase_credentials.json",
});
