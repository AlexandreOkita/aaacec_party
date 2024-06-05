"use client";

import { useEffect, useState } from "react";
import WithAuthentication from "../middleware/WithAuthentication";
import { ScheduledBoom } from "../controllers/BoomController";
import Confetti from "react-confetti";
import { useInterval, useWindowSize } from "usehooks-ts";
import moment from "moment-timezone";
import { useRouter } from "next/navigation";

const Boom = () => {
  const [scheduledBoom, setScheduleBoom] = useState<ScheduledBoom | null>(null);

  const { width, height } = useWindowSize();

  const router = useRouter();

  useEffect(() => {
    const newScheduledBoom = localStorage.getItem("scheduledBoom");
    if (!newScheduledBoom) {
      setScheduleBoom(null);
    } else {
      setScheduleBoom(JSON.parse(newScheduledBoom));
    }
  }, []);

  const goToLeaderboardPage = () => {
    router.replace("/leaderboard");
  };

  const checkBoomTimer = () => {
    const endDate = moment(scheduledBoom?.endDate).tz("America/Sao_Paulo");
    const now = moment().tz("America/Sao_Paulo");
    const diff = endDate.diff(now);
    if (diff < 0) {
      localStorage.setItem("scheduledBoom", "");
      goToLeaderboardPage();
    }
  };

  useInterval(() => {
    checkBoomTimer();
  }, 1000);

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
