import { useState } from "react";
import { Typography, Dialog, DialogFooter, DialogHeader, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ChallengesController from "../controllers/ChallengesController";
import { ChallengesTable } from "../components/ChallengesTable";
import { OngoingChallenge } from "./page";

enum Pages {
  GET_CHALLENGE = "get_challenge",
  ACCEPT_CHALLENGE = "accept_challenge",
  SOLVE_CHALLENGE = "solve_challenge"
}

export default function SolveChallengePage({
  setPage,
  ongoingChallenges,
  removeOngoingChallenge
}: {
  setPage: (page: Pages) => void;
  ongoingChallenges: OngoingChallenge[];
  removeOngoingChallenge: (challenge: OngoingChallenge) => void;
}) {

  const [guestId, setGuestId] = useState<number>();
  const [guestName, setGuestName] = useState<string>();
  const [currentChallenge, setCurrentChallenge] = useState<OngoingChallenge>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const renderDialog = () => {
    const score = async () => {
      const token = Cookies.get("token") || "";

      try {
        const response = await ChallengesController.solveChallenge(token, guestId!, currentChallenge!.challenge.points, guestName!);
        setPage(Pages.GET_CHALLENGE);
        toast.success(`Pontuação adicionada! ${guestName?.split('-')[1]}-${guestId} agora possui ${response.data.currentScore} pontos.`);
        removeOngoingChallenge(currentChallenge!);
      } catch (error: any) {
        if (error.response.data.message == "Error when trying to handle document: guests. GuestId not found") {
          toast.error("Não foi possível encontrar usuário com esse ID.");
          removeOngoingChallenge(currentChallenge!);
        } else {
          toast.error("Erro desconhecido ao adicionar pontuação.");
        }
      }
    };

    return (
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Confirmar?
            </Typography>
          </DialogHeader>
          <Typography variant="h6">{currentChallenge?.guestId}: {currentChallenge?.challenge.points} ponto(s)</Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="deep-orange"
            onClick={() => {
              removeOngoingChallenge(currentChallenge!);
              handleOpen();
            }}
          >
            Deletar
          </Button>
          <Button
            variant="gradient"
            color="orange"
            onClick={() => {
              handleOpen();
            }}
          >
            Não
          </Button>
          <Button
            variant="gradient"
            color="light-green"
            onClick={() => {
              score();
              handleOpen();
            }}
          >
            Sim
          </Button>
          
        </DialogFooter>
      </Dialog>
    );
  };

  return (
    <>
      <main className="items-center justify-center h-fit">
      <ChallengesTable
          tableRows={ongoingChallenges
            .map((challenge: OngoingChallenge) => ({
              color: challenge.guestName.split("-")[1],
              numericId: challenge.guestId,
              description: challenge.challenge.description,
              onclick: () => {
                setCurrentChallenge(challenge);
                setGuestId(challenge.guestId);
                setGuestName(challenge.guestName);
                handleOpen();
              }
            }))  
          }
        />
      
      {renderDialog()}
      </main>
      <Button className="mt-4 ms-2" onClick={() => setPage(Pages.GET_CHALLENGE)}>Voltar</Button>  
    </>
  )
}