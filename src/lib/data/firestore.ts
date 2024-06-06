import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore({
  projectId: "aaacecparty",
  keyFilename: "src/lib/data/firebase_credentials.json",
});

if (process.env.AAACEC_PARTY_ENVIRONMENT !== "production") {
  firestore.settings({
    host: "localhost:8080",
    ssl: false,
  });
}

export { firestore };
