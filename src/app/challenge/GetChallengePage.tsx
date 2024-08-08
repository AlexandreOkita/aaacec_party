import { Input, Checkbox, Select, Option, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

enum Pages {
  GET_CHALLENGE = "get_challenge",
  SOLVE_CHALLENGE = "solve_challenge"
}

export default function GetChallengePage({
  setPage,
  setTags,
  setDifficulty,
  setGuestId,
  pickRandomChallenge,
  guestId,
  tags,
  difficulty
}: {
  setPage: (page: Pages) => void;
  setTags: (tags: string[]) => void;
  setDifficulty: (difficulty: number) => void;
  setGuestId: (guestId: number) => void;
  pickRandomChallenge: () => boolean;
  guestId: number;
  tags: string[];
  difficulty: number;
}) {

  const generateChallenge = () => {
    if (pickRandomChallenge()) {
      setPage(Pages.SOLVE_CHALLENGE);
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

        <div>
          <Input variant="outlined" placeholder="ID" label="ID" type="number" value={guestId} onChange={(e) => setGuestId(parseInt(e.target.value))} crossOrigin={undefined}/>
        </div>

        <div>
          <Checkbox value="alcoolico" label="Incluir álcool" onChange={toggleTag} checked={tags.includes("alcoolico")} />
          <Checkbox value="pegacao" label="Incluir pegação" onChange={toggleTag} checked={tags.includes("pegacao")} />
        </div>
        
        <div>

          {!isNaN(difficulty) && (
            <Select label="Dificuldade" value={difficulty.toString()} onChange={(value) => setDifficulty(parseInt(value || ""))}>
              <Option value="1">Fácil</Option>
              <Option value="2">Médio</Option>
              <Option value="3">Difícil</Option>
            </Select>
          )}
           {isNaN(difficulty) && (
            <Select label="Dificuldade" onChange={(value) => setDifficulty(parseInt(value || ""))}>
              <Option value="1">Fácil</Option>
              <Option value="2">Médio</Option>
              <Option value="3">Difícil</Option>
            </Select>
          )}

        </div>

        {!isNaN(guestId) && !isNaN(difficulty) ? <Button onClick={generateChallenge}>GERAR DESAFIO</Button> : <Button disabled>GERAR DESAFIO</Button>}

    	</div>

    </main>
  );
}
