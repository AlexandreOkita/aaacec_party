"use client";

import { Spinner } from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import GetChallengePage from "./GetChallengePage";
import ChallengesController from "../controllers/ChallengesController";
import AcceptChallengePage from "./AcceptChallengePage";
import SolveChallengePage from "./SolveChallengePage";

export interface Challenge {
  numericId: number;
  description: string;
  tags: string[];
  points: number;
}

export interface OngoingChallenge {
  guestName: string;
  guestId: number;
  challenge: Challenge;
}

enum Pages {
  GET_CHALLENGE = "get_challenge",
  ACCEPT_CHALLENGE = "accept_challenge",
  SOLVE_CHALLENGE = "solve_challenge"
}

const Challenge = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.GET_CHALLENGE);
  const [ongoingChallenges, setOngoingChallenges] = useState<OngoingChallenge[]>([]);

  const [randomChallenge, setRandomChallenge] = useState<Challenge>();
  const [guestId, setGuestId] = useState<number>();
  const [guestName, setGuestName] = useState<string>();
  const [tags, setTags] = useState<string[]>(["alcoolico", "pegacao"])
  const [difficulty, setDifficulty] = useState<number>(1)

  const getChallenges = async () => {
    setLoading(true);
    const challengesResponse = await ChallengesController.getChallenges();
    if (!challengesResponse?.length) {
      setError("Erro ao obter logins");
    } else {
      setChallenges(challengesResponse);
      setRandomChallenge(challenges[0]);
    }
    setLoading(false);
  };

  const addOngoingChallenge = async (challenge: Challenge) => {
    const oc = {
      guestName: guestName!,
      guestId: guestId!,
      challenge: challenge
    } as OngoingChallenge;
    
    const challenges = [...ongoingChallenges, oc];
    
    setOngoingChallenges(challenges);
    localStorage.setItem("ongoingChallenges", JSON.stringify(challenges));
  };

  const getOngoingChallenges = async () => {
    let challenges: OngoingChallenge[] = [];

    if (localStorage.getItem("ongoingChallenges")) {
      challenges = JSON.parse(localStorage.getItem("ongoingChallenges")!) as OngoingChallenge[];
      setOngoingChallenges(challenges);
    }
  };

  const removeOngoingChallenge = async (challenge: OngoingChallenge) => {
    const challenges = ongoingChallenges.filter((oc) => oc !== challenge);
    setOngoingChallenges(challenges);
    localStorage.setItem("ongoingChallenges", JSON.stringify(challenges));
  };

  const pickRandomChallenge = (): boolean => {

    const filteredChallenges: Challenge[] = challenges.filter((challenge) => {

      // Eliminate all challenges that have tags not included in the guest's tag list

      let forbiddenTags: boolean = false;

      challenge.tags.map((tag) => {
        if (!tags?.includes(tag)) {
          forbiddenTags = true;
        }
      });

      return challenge.points == difficulty && !forbiddenTags;

    });

    const size = filteredChallenges.length;

    if (size > 0) {
      const index = Math.floor(Math.random() * size);
      setRandomChallenge(filteredChallenges[index]);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getChallenges();
    getOngoingChallenges();
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
            {currentPage === Pages.ACCEPT_CHALLENGE && (
              <AcceptChallengePage
                setPage={setCurrentPage}
                randomChallenge={randomChallenge!}
                pickRandomChallenge={pickRandomChallenge}
                addOngoingChallenge={addOngoingChallenge}
                guestId={guestId!}
                guestName={guestName!}
              />
            )}
            {currentPage === Pages.SOLVE_CHALLENGE && (
              <SolveChallengePage
                setPage={setCurrentPage}
                ongoingChallenges={ongoingChallenges}
                removeOngoingChallenge={removeOngoingChallenge}
              />
            )}
            {currentPage === Pages.GET_CHALLENGE && (
              <GetChallengePage
                setPage={setCurrentPage}
                setTags={setTags}
                setDifficulty={setDifficulty}
                setGuestId={setGuestId}
                setGuestName={setGuestName}
                pickRandomChallenge={pickRandomChallenge}
                ongoingChallenges={ongoingChallenges}
                guestId={guestId!}
                guestName={guestName!}
                tags={tags}
                difficulty={difficulty!}
              />
            )}
          </>
        </div>
        <ToastContainer 
            position="top-right"
            autoClose={7000}
            theme="colored"
            pauseOnHover={false}
            draggable
            closeOnClick
          />
      </div>
    </>
  );
};

export default WithAuthentication(Challenge, [AAACECRole.WORKER]);
