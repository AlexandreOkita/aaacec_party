"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { NavBar } from "../components/NavBar";
import { useState } from "react";
import Cookies from "js-cookie";
import GuestController from "../controllers/GuestController";

const Concierge = () => {
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const generateLogin = async () => {
    const token = Cookies.get("token") || "";
    setLoading(true);
    const generatedLoginResponse = await GuestController.generateGuestLogin(
      token
    );
    if (!generatedLoginResponse.guestLogin) {
      setLogin("Erro ao gerar login");
    } else {
      setLogin(generatedLoginResponse.guestLogin);
    }
    setLoading(false);
  };

  const renderEmptyLogin = () => {
    return <span className="text-gray-400">Gere um login</span>;
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center h-screen flex-col justify-between mt-[-56px]">
        {loading ? (
          <div className="pt-10 mt-[56px]">
            <Spinner />
          </div>
        ) : (
          <span className="text-3xl pt-10 mt-[56px]">
            {login || renderEmptyLogin()}
          </span>
        )}
        <Button
          className="mb-9"
          placeholder={undefined}
          onClick={() => generateLogin()}
          disabled={loading}
        >
          Gerar login
        </Button>
      </div>
    </>
  );
};

export default WithAuthentication(Concierge, [AAACECRole.CONCIERGE]);
