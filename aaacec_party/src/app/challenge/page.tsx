"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GuestController from "../controllers/GuestController";
import DefaultLoginsController from "../controllers/DefaultLoginsController";
import LoginsPage from "./LoginsPage";
import GetChallengePage from "./GetChallengePage";

export interface DefaultLogin {
  imgUrl: string;
  login: string;
}

export enum Pages {
  LOGINS = "logins",
  GET_CHALLENGE = "get_challenge",
}

const Challenge = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultLogins, setDefaultLogins] = useState<DefaultLogin[]>([]);
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.LOGINS);
  const getLogins = async () => {
    const token = Cookies.get("token") || "";
    setLoading(true);
    const defaultLoginsResponse =
      await DefaultLoginsController.getDefaultLogins(token);
    if (!defaultLoginsResponse?.length) {
      setError("Erro ao obter logins");
    } else {
      setDefaultLogins(defaultLoginsResponse);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLogins();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex items-center h-screen flex-col justify-between mt-[-56px]">
        <div className="mt-[56px]">
          {loading ? (
            <div className="pt-10 ">
              <Spinner />
            </div>
          ) : (
            <>
              {currentPage === Pages.LOGINS && (
                <LoginsPage
                  setPage={setCurrentPage}
                  defaultLogins={defaultLogins}
                />
              )}
              {currentPage === Pages.GET_CHALLENGE && (
                <GetChallengePage setPage={setCurrentPage} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WithAuthentication(Challenge, [AAACECRole.WORKER]);
