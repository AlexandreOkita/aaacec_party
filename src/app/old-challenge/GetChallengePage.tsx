import { IconButton, Input } from "@material-tailwind/react";
import { useState } from "react";
import { ChallengesTable } from "../components/ChallengesTable";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

interface Challenge {
  numericId: number;
  description: string;
}

enum Pages {
  LOGINS = "logins",
  GET_CHALLENGE = "get_challenge",
}

export default function GetChallengePage({
  setPage,
  challenges,
}: {
  setPage: (page: Pages) => void;
  challenges: Challenge[];
}) {
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const getRandomChallenge = () => {
    const max = challenges.length;
    const randomNumber = Math.floor(Math.random() * max) + 1;
    setSelectedNumber(randomNumber);
  };

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
      <div
        onClick={() => setPage(Pages.LOGINS)}
        className="fixed bottom-0 w-screen h-14 bg-purple flex justify-center items-center text-lg cursor-pointer"
      >
        <span className="text-xl font-bold">Atribuir pontos</span>
      </div>
    </div>
  );
}
