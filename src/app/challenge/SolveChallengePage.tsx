import {
  Button,
  Typography,
} from "@material-tailwind/react";

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

export default function SolveChallengePage({
  setPage,
  randomChallenge,
  pickRandomChallenge,
  guestId
}: {
  setPage: (page: Pages) => void;
  randomChallenge: Challenge;
  pickRandomChallenge: () => void;
  guestId: number;
}) {

  const acceptChallenge = () => {
    
    setPage(Pages.GET_CHALLENGE);

  }

  const refuseChallenge = () => {

    setPage(Pages.GET_CHALLENGE);

  }

  return (
    <main className="flex items-center justify-center h-full">
      
      <div className="flex flex-col gap-4 px-3 pt-7">

        <Typography variant="h3">ID {guestId}</Typography>

        <Typography variant="paragraph">{randomChallenge?.description} ({randomChallenge?.points} pontos)</Typography>

        <div className="flex flex-row gap-6">
          <Button onClick={acceptChallenge}>Aceitar</Button>
          <Button onClick={pickRandomChallenge}>Outro Desafio</Button>
          <Button onClick={refuseChallenge}>Recusar</Button>
        </div>

      </div>

    </main>
  );
}
