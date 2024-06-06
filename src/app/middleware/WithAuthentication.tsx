"use client";

import { JWTSigner } from "@/lib/jwt/jwt_signer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AAACECRole } from "../domain/aaacec_roles";
import { useRouter } from "next/navigation";
import LoginController from "../controllers/LoginController";
import { Spinner } from "@material-tailwind/react";

export default function WithAuthentication(
  WrappedComponent: () => JSX.Element,
  roles: AAACECRole[]
) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const verifyToken = async () => {
        const token = Cookies.get("token") || "";
        try {
          const tokenInformation = await JWTSigner.verify(token);
          const isValid =
            tokenInformation.role === AAACECRole.ADMIN ||
            roles.includes(tokenInformation.role);
          if (isValid) setLoading(false);
        } catch (e: any) {
          LoginController.logOut(router);
        }
      };
      verifyToken();
    }, []);

    return loading ? (
      <div className="flex w-screen h-screen justify-center items-center">
        <Spinner />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return Wrapper;
}
