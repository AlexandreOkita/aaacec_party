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
  ACCEPT_CHALLENGE = "accept_challenge",
  SOLVE_CHALLENGE = "solve_challenge"
}

export default function AccepctChallengePage({
  setPage,
  randomChallenge,
  pickRandomChallenge,
  addOngoingChallenge,
  guestName,
  guestId
}: {
  setPage: (page: Pages) => void;
  randomChallenge: Challenge;
  pickRandomChallenge: () => void;
  addOngoingChallenge: (challenge: Challenge) => void;
  guestName: String;
  guestId: number;
}) {

  const acceptChallenge = async () => {
    // const token = Cookies.get("token") || "";

    // const response = await ChallengesController.solveChallenge(token, guestId, randomChallenge.points);
    // if (response.status === 200) {
    //   setPage(Pages.GET_CHALLENGE);
    //   toast.success(`Pontuação adicionada! ${guestId} agora possui ${response.data.currentScore} pontos.`);
    // } else {
    //   setPage(Pages.GET_CHALLENGE);
    //   toast.error("Erro ao adicionar pontuação.");
    // }
    addOngoingChallenge(randomChallenge);
    setPage(Pages.GET_CHALLENGE);
  }

  const refuseChallenge = () => {
    setPage(Pages.GET_CHALLENGE);
  }

  return (
    <main className="flex items-center justify-center h-full">
      
      <div className="flex flex-col gap-4 px-3 pt-7">

        <Typography variant="h3">{guestName.split("-")[1]} {guestId}</Typography>

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
