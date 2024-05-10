import { firestore } from "@/lib/data/firestore";

export async function GET(request: Request) {
  return new Response("GET request received");
}

export async function POST(request: Request) {
  const body = await request.json();
  await firestore
    .doc(`users/${body.username}`)
    .set({ username: body.username, password: body.password });
  return new Response(`User (${body.username}) created successfully`);
}
