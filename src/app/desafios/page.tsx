"use client";

import { IconButton, Input, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ChallengesTable } from "../components/ChallengesTable";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import ChallengesController from "../controllers/ChallengesController";

interface Challenge {
  numericId: number;
  description: string;
}

export default function DesafiosPage() {
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const getChallenges = async () => {
    setLoading(true);
    const challengesResponse = await ChallengesController.getChallenges();
    setChallenges(challengesResponse);
    setLoading(false);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const getRandomChallenge = () => {
    const max = challenges.length;
    const randomNumber = Math.floor(Math.random() * max) + 1;
    setSelectedNumber(randomNumber);
  };

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-between flex-col">
      <div className="p-3 mb-14">
        <div className="flex flex-col">
          <span>Número do desafio:</span>
          <div className="mt-2 mb-4 flex justify-between">
            <div className="w-2/3">
              <Input
                type="number"
                label="Número"
                value={selectedNumber}
                onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
                crossOrigin={undefined}
              />
            </div>
            <div>
              <IconButton
                variant="outlined"
                onClick={() => getRandomChallenge()}
              >
                <ArrowPathRoundedSquareIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
        </div>
        <ChallengesTable
          tableRows={challenges
            .map((challenge: Challenge) => ({
              color: "",
              numericId: challenge.numericId,
              description: challenge.description,
            }))
            .filter((c: Challenge) =>
              selectedNumber || selectedNumber == 0
                ? c.numericId === selectedNumber
                : true
            )}
        />
      </div>
    </div>
  );
}
