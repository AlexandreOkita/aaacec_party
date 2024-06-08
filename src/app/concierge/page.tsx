"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { NavBar } from "../components/NavBar";
import { useState } from "react";
import Cookies from "js-cookie";
import GuestController from "../controllers/GuestController";

const Concierge = () => {
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dressCodeAdded, setDressCodeAdded] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const generateLogin = async (addScore: boolean) => {
    const token = Cookies.get("token") || "";
    setLoading(true);
    const generatedLoginResponse = await GuestController.generateGuestLogin(
      token
    );
    if (!generatedLoginResponse.guestLogin) {
      setLogin("Erro ao gerar login");
    } else {
      setLogin(generatedLoginResponse.guestLogin);
      if (addScore) {
        scoreGuest(
          generatedLoginResponse.guestOriginalName,
          generatedLoginResponse.guestOriginalNumber
        );
        setDressCodeAdded(true);
      } else {
        setDressCodeAdded(false);
      }
    }
    setLoading(false);
  };

  const scoreGuest = (login: string, number: number) => {
    const token = Cookies.get("token") || "";
    GuestController.scoreGuest(token, login, number, 5);
  };

  const renderEmptyLogin = () => {
    return <span className="text-gray-400">Gere um login</span>;
  };

  const renderDialog = () => {
    return (
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Dress code?
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
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="orange"
            onClick={() => {
              generateLogin(false);
              handleOpen();
            }}
          >
            Não
          </Button>
          <Button
            variant="gradient"
            color="light-green"
            onClick={() => {
              generateLogin(true);
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
      <NavBar />
      <div className="flex items-center h-screen flex-col justify-between fixed w-screen">
        {loading ? (
          <div className="pt-10 mt-[56px]">
            <Spinner />
          </div>
        ) : (
          <div className="pt-10 flex flex-col">
            <span className="text-3xl">{login || renderEmptyLogin()}</span>
            <span className="text-sm text-light-green-600">
              {login && (dressCodeAdded ? "Começa com 5 pontos" : "")}
            </span>
          </div>
        )}

        <div
          onClick={() => (loading ? null : handleOpen())}
          className="fixed bottom-0 w-screen h-14 bg-purple flex justify-center items-center text-lg cursor-pointer"
        >
          {loading ? (
            <div className="flex w-screen h-screen justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <span className="text-xl font-bold">Gerar login</span>
          )}
        </div>
      </div>
      {renderDialog()}
    </>
  );
};

export default WithAuthentication(Concierge, [AAACECRole.CONCIERGE]);
