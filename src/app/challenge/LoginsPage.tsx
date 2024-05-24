import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { DefaultLogin, Pages } from "./page";
import { useState } from "react";
import GuestController from "../controllers/GuestController";
import Cookies from "js-cookie";

const data = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    login: "Pamonha",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    login: "Milho",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    login: "Amendoim",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    login: "Pipoca",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    login: "Cural",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    login: "Fogueira",
  },
  {
    imgUrl:
      "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
    login: "Junino",
  },
  {
    imgUrl:
      "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
    login: "Cachorro-quente",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
    login: "Pipoca Doce",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    login: "Fogueira",
  },
  {
    imgUrl:
      "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg",
    login: "Junino",
  },
  {
    imgUrl:
      "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
    login: "Cachorro-quente",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
    login: "Pipoca Doce",
  },
];

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
