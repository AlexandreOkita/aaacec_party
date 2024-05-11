import { createSecretKey } from "crypto";
import { SignJWT, jwtVerify } from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}


export class JWTSigner {
  static async sign(payload: any): Promise<string> {
    const secretKey = createSecretKey(process.env.JWT_SECRET!, "utf-8");
    console.log(secretKey)
    const token = await new SignJWT(payload)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("30 minutes")
      .sign(secretKey);
    return token;
  }

  static async verify(token: string): Promise<any> {
    console.log(token)
    const secretKey = jwtConfig.secret;
    try {
      const { payload } = await jwtVerify(token, secretKey);
      return payload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
