import { Input, Checkbox, Select, Option, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

enum Pages {
  GET_CHALLENGE = "get_challenge",
  ACCEPT_CHALLENGE = "accept_challenge",
  SOLVE_CHALLENGE = "solve_challenge"
}

export default function GetChallengePage({
  setPage,
  setTags,
  setDifficulty,
  setGuestId,
  setGuestName,
  pickRandomChallenge,
  ongoingChallenges,
  guestId,
  guestName,
  tags,
  difficulty
}: {
  setPage: (page: Pages) => void;
  setTags: (tags: string[]) => void;
  setDifficulty: (difficulty: number) => void;
  setGuestId: (guestId: number) => void;
  setGuestName: (guestName: string) => void;
  pickRandomChallenge: () => boolean;
  ongoingChallenges: any[];
  guestId: number;
  guestName: string;
  tags: string[];
  difficulty: number;
}) {

  const generateChallenge = () => {
    if (pickRandomChallenge()) {
      setPage(Pages.ACCEPT_CHALLENGE);
    } else {
      toast.error("Não foi possível encontrar um desafio com as características selecionadas");
    }
  };

  const toggleTag = (e: any) => {

    let newTags: string[] = [];

    if (e.target.checked) {
      
      newTags = [...tags, e.target.value]

    } else {
      
      newTags = tags?.filter((tag) => e.target.value != tag)

    }

    setTags(newTags);

  };

  return (
    
    <main className="flex items-center justify-center h-screen">

    	<div className="flex flex-col gap-4 px-3">

        <div className="flex flex-col gap-4">
          <Select
            label="Cor"
            onChange={(v: string | undefined) => setGuestName(v!)}
            value={guestName ? guestName : undefined}
          >
              <Option value="025corotebreak-vermelho">Vemelho</Option>
              <Option value="025corotebreak-verde">Verde</Option>
              <Option value="025corotebreak-laranja">Laranja</Option>
              <Option value="025corotebreak-rosa">Rosa</Option>
          </Select>
          <Input variant="outlined" placeholder="ID" label="ID" type="number" value={guestId} onChange={(e) => setGuestId(parseInt(e.target.value))} crossOrigin={undefined}/>
        </div>

        <div>
          <Checkbox value="alcoolico" label="Incluir álcool" onChange={toggleTag} checked={tags.includes("alcoolico")} crossOrigin={undefined}/>
          <Checkbox value="pegacao" label="Incluir pegação" onChange={toggleTag} checked={tags.includes("pegacao")} crossOrigin={undefined}/>
        </div>
        
        <div>
        </div>

        {!isNaN(guestId) && !isNaN(difficulty) && guestName ? <Button onClick={generateChallenge}>GERAR DESAFIO</Button> : <Button disabled>GERAR DESAFIO</Button>}
        {ongoingChallenges.length > 0 ? <Button onClick={() => setPage(Pages.SOLVE_CHALLENGE)}>COMPLETAR DESAFIO</Button> : <Button disabled>COMPLETAR DESAFIO</Button>}
    	</div>

    </main>
  );
}
