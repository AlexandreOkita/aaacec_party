import { createSecretKey } from "crypto";
import { SignJWT, jwtVerify } from "jose";

export class JWTSigner {
  static async sign(payload: any): Promise<string> {
    const secretKey = createSecretKey(process.env.JWT_SECRET!, "utf-8");
    const token = await new SignJWT(payload)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("5 minutes")
      .sign(secretKey);
    return token;
  }

  static async verify(token: string): Promise<any> {
    const secretKey = createSecretKey(process.env.JWT_SECRET!, "utf-8");
    try {
      const { payload } = await jwtVerify(token, secretKey);
      return payload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
