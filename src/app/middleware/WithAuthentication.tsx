"use client";

import { JWTSigner } from "@/lib/jwt/jwt_signer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AAACECRole } from "../domain/aaacec_roles";

export default function WithAuthentication(
  WrappedComponent: () => JSX.Element,
  roles: AAACECRole[]
) {
  const Wrapper = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const verifyToken = async () => {
        const token = Cookies.get("token") || "";
        const tokenInformation = await JWTSigner.verify(token);
        const isValid =
          tokenInformation.role === AAACECRole.ADMIN ||
          roles.includes(tokenInformation.role);
        if (isValid) setLoading(false);
      };
      verifyToken();
    }, []);

    return loading ? <div>Loading</div> : <WrappedComponent {...props} />;
  };
  return Wrapper;
}
