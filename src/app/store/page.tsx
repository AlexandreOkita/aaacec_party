"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AAACECRole } from "../domain/aaacec_roles";
import { useState, useEffect } from "react";
import WithAuthentication from "../middleware/WithAuthentication";
import StoreController from "../controllers/StoreController";
import { NavBar } from "../components/NavBar";

interface StoreItem {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

function StorePage({storeItems}: {storeItems: StoreItem[]}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [selectedItem, setSelectedItem] = useState<StoreItem>();
  const [selectedName, setSelectedName] = useState<string>("corotebreak");
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const buyItem = async () => {
    const token = Cookies.get("token") || "";
    
    const newScore = await StoreController.buyItem(token, selectedItem?.id || "", selectedName || "", selectedNumber || 0);
    if (newScore === -1) {
      toast.error("Erro ao comprar item!");
    } else if (newScore === -2) {
      toast.warn("Pontos insuficientes!");
    } else {
      toast.success("Item comprado com sucesso!\nPontos restantes: " + newScore);
    }
  }

  const renderDialog = () => {
    return (
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              {selectedItem?.name}
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
            
          {/*
            Uncomment this to allow for name-number pattern of id
            <Input
              type="string"
              label="ID Nome"
              onChange={(e) => setSelectedName(e.target.value)}
              crossOrigin={undefined}
            /> */}

            <Input
              type="number"
              label="ID numérico"
              onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
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
            disabled={selectedNumber === undefined || selectedName === undefined}
            onClick={() => {
              buyItem();
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
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-6 md:grid-cols-3 p-3 mb-14">
        {storeItems.map(({ id, imageUrl, name, price }, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem({ id, imageUrl, name, price });
              handleOpen();
            }}
          >
            <figure className="relative h-40 w-full">
              <img
                className="h-full w-full rounded-xl object-cover object-center"
                src={imageUrl}
                alt="nature image"
              />
              <figcaption className="absolute bottom-1 left-2/4 flex justify-center w-[calc(100%-0.5rem)] -translate-x-2/4 rounded-xl border border-white bg-white/75 py-1 px-1 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                  <Typography className="text-sm" color="blue-gray">
                    {name}: {price} p
                  </Typography>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
      {renderDialog()}
    </div>
  );
}

const Store = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);


  const getStoreItems = async () => {
    const token = Cookies.get("token") || "";
    setLoading(true);
    const storeItemsResponse =
      await StoreController.getStoreItems(token);
    if (!storeItemsResponse?.length) {
      setError("Erro ao obter logins");
    } else {
      setStoreItems(storeItemsResponse);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStoreItems();
  }, []);

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center h-screen flex-col justify-between mt-[-56px]">
        <div className="mt-[56px] w-full">
          <NavBar />
          <StorePage storeItems={storeItems} />
          <ToastContainer 
            position="top-right"
            autoClose={7000}
            theme="colored"
            pauseOnHover={false}
            draggable
            closeOnClick
          />
        </div>
      </div>
    </>
  );
};

export default WithAuthentication(Store, [AAACECRole.WORKER]);

