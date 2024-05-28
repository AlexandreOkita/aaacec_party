"use client";

import { useEffect, useState } from "react";
import WithAuthentication from "../middleware/WithAuthentication";
import { ScheduledBoom } from "../controllers/BoomController";
import Confetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";

const Boom = () => {
  const [scheduledBoom, setScheduleBoom] = useState<ScheduledBoom | null>(null);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const newScheduledBoom = localStorage.getItem("scheduledBoom");
    if (newScheduledBoom === null) {
      setScheduleBoom(null);
    } else {
      setScheduleBoom(JSON.parse(newScheduledBoom));
    }
  }, []);

  if (!scheduledBoom) {
    return <div>LOADING BOOM</div>;
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Confetti width={width} height={height} />
      <img src={scheduledBoom?.imageUrl} />
    </div>
  );
};

export default WithAuthentication(Boom, []);
