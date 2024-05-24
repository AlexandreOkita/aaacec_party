import { NextRequest, NextResponse } from "next/server";
import { AAACECRole } from "../app/domain/aaacec_roles";
import { JWTSigner } from "./jwt/jwt_signer";

export function Authorize(authorizedRoles: AAACECRole[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalFunction = descriptor.value;
    descriptor.value = async function (request: NextRequest, ...args: any[]) {
      const auth_token = request.headers.get("Authorization");
      if (!auth_token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const token = auth_token.replace("Bearer ", "");
      const payload = await JWTSigner.verify(token);

      if (!(authorizedRoles.filter((e) => e === payload.role).length > 0)) {
        return NextResponse.json(
          {
            message: `This method can only be invoked by the roles: ${authorizedRoles}. Your role is: ${payload.role}`,
          },
          { status: 401 }
        );
      }
      return originalFunction.apply(this, [request, ...args]);
    };

    return descriptor;
  };
}
