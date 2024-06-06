"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DefaultLoginsController from "../controllers/DefaultLoginsController";
import LoginsPage from "./LoginsPage";
import GetChallengePage from "./GetChallengePage";
import ChallengesController from "../controllers/ChallengesController";

interface DefaultLogin {
  imgUrl: string;
  login: string;
}

interface Challenge {
  numericId: number;
  description: string;
}

enum Pages {
  LOGINS = "logins",
  GET_CHALLENGE = "get_challenge",
}

const Challenge = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultLogins, setDefaultLogins] = useState<DefaultLogin[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
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

  const getChallenges = async () => {
    setLoading(true);
    const challengesResponse = await ChallengesController.getChallenges();
    if (!challengesResponse?.length) {
      setError("Erro ao obter logins");
    } else {
      setChallenges(challengesResponse);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLogins();
    getChallenges();
  }, []);

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex items-center h-screen flex-col justify-between mt-[-56px]">
        <div className="mt-[56px] w-full">
          <>
            {currentPage === Pages.LOGINS && (
              <LoginsPage
                setPage={setCurrentPage}
                defaultLogins={defaultLogins}
              />
            )}
            {currentPage === Pages.GET_CHALLENGE && (
              <GetChallengePage
                setPage={setCurrentPage}
                challenges={challenges}
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default WithAuthentication(Challenge, [AAACECRole.WORKER]);
