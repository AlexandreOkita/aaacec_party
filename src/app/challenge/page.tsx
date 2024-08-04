"use client";

import { Spinner } from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import GetChallengePage from "./GetChallengePage";
import ChallengesController from "../controllers/ChallengesController";
import SolveChallengePage from "./SolveChallengePage";

interface Challenge {
  numericId: number;
  description: string;
  tags: string[];
  points: number;
}

enum Pages {
  GET_CHALLENGE = "get_challenge",
  SOLVE_CHALLENGE = "solve_challenge"
}

const Challenge = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.GET_CHALLENGE);

  const [randomChallenge, setRandomChallenge] = useState<Challenge>();
  const [guestId, setGuestId] = useState<number>();
  const [tags, setTags] = useState<string[]>(["alcoolico", "pegacao"])
  const [difficulty, setDifficulty] = useState<number>()

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

  const pickRandomChallenge = () => {

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

    if (filteredChallenges) {
      const index = Math.floor(Math.random() * size);
      setRandomChallenge(filteredChallenges[index]);
    }

  };

  useEffect(() => {
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
            {currentPage === Pages.SOLVE_CHALLENGE && (
              <SolveChallengePage
                setPage={setCurrentPage}
                randomChallenge={randomChallenge}
                pickRandomChallenge={pickRandomChallenge}
                guestId={guestId}
              />
            )}
            {currentPage === Pages.GET_CHALLENGE && (
              <GetChallengePage
                setPage={setCurrentPage}
                setTags={setTags}
                setDifficulty={setDifficulty}
                setGuestId={setGuestId}
                pickRandomChallenge={pickRandomChallenge}
                guestId={guestId}
                tags={tags}
                difficulty={difficulty}
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default WithAuthentication(Challenge, [AAACECRole.WORKER]);
