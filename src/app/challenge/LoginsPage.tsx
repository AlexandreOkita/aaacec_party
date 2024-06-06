import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import GuestController from "../controllers/GuestController";
import Cookies from "js-cookie";

interface DefaultLogin {
  imgUrl: string;
  login: string;
}

enum Pages {
  LOGINS = "logins",
  GET_CHALLENGE = "get_challenge",
}

export default function LoginsPage({
  setPage,
  defaultLogins,
}: {
  setPage: (page: Pages) => void;
  defaultLogins: DefaultLogin[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [selectedLogin, setSelectedLogin] = useState<DefaultLogin>();
  const [selectedId, setSelectedId] = useState<number>();

  const scoreGuest = () => {
    const token = Cookies.get("token") || "";
    GuestController.scoreGuest(
      token,
      selectedLogin?.login || "",
      selectedId || 0
    );
  };

  const renderDialog = () => {
    return (
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              {selectedLogin?.login}
            </Typography>
          </DialogHeader>
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
        <DialogBody>
          <div className="grid gap-6">
            <Input
              type="number"
              label="ID numérico"
              onChange={(e) => setSelectedId(parseInt(e.target.value))}
              crossOrigin={undefined}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancelar
          </Button>
          <Button
            variant="gradient"
            color="gray"
            onClick={() => {
              scoreGuest();
              handleOpen();
            }}
          >
            Enviar
          </Button>
        </DialogFooter>
      </Dialog>
    );
  };

  return (
    <div className="flex justify-between flex-col">
      <div className="grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-3 p-3 mb-14">
        {defaultLogins.map(({ imgUrl, login }, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedLogin({ imgUrl, login });
              handleOpen();
            }}
          >
            <figure className="relative h-40 w-full">
              <img
                className="h-full w-full rounded-xl object-cover object-center"
                src={imgUrl}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1 left-2/4 flex justify-center w-[calc(100%-0.5rem)] -translate-x-2/4 rounded-xl border border-white bg-white/75 py-1 px-1 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography className="text-sm" color="blue-gray">
                    {login}
                  </Typography>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
      {renderDialog()}
      <div
        onClick={() => setPage(Pages.GET_CHALLENGE)}
        className="fixed bottom-0 w-screen h-14 bg-gray-600 flex justify-center items-center text-lg cursor-pointer"
      >
        Ver desafios
      </div>
    </div>
  );
}
