import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import LoginController from "../controllers/LoginController";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          AAACEC
        </Typography>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-1">
            <Button
              variant="text"
              size="sm"
              className="lg:inline-block"
              onClick={() => LoginController.logOut(router)}
            >
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
