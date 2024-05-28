"use client";

import { useEffect, useState } from "react";
import WithAuthentication from "../middleware/WithAuthentication";
import { ScheduledBoom } from "../controllers/BoomController";

const Boom = () => {
  const [scheduledBoom, setScheduleBoom] = useState<ScheduledBoom | null>(null);

  useEffect(() => {
    const newScheduledBoom = localStorage.getItem("scheduledBoom");
    if (newScheduledBoom === null) {
      setScheduleBoom(null);
    } else {
      setScheduleBoom(JSON.parse(newScheduledBoom));
    }
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <img src={"images/boom/milho.gif"} />
    </div>
  );
};

export default WithAuthentication(Boom, []);
