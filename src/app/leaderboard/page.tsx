"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";
import LeaderboardController, {
  Score,
} from "../controllers/LeaderboardController";
import { useInterval } from "usehooks-ts";
import BoomController, { ScheduledBoom } from "../controllers/BoomController";
import moment, { Moment } from "moment-timezone";
import { useRouter } from "next/navigation";

const LEADERBOARD_SIZE = 12;

const LEADERBOARD_CONTROLL = {
  0: [3, 3 + LEADERBOARD_SIZE],
  1: [3 + LEADERBOARD_SIZE, 3 + LEADERBOARD_SIZE * 2],
  2: [3 + LEADERBOARD_SIZE * 2, 3 + LEADERBOARD_SIZE * 3],
};

const Leaderboard = () => {
  const [leaderboardList, setLeaderboardList] = useState<Score[]>([]);
  const [filteredLeaderboardList, setFilteredLeaderboardList] = useState<
    Score[]
  >([]);
  const [top3List, setTop3List] = useState<Score[]>([]);
  const [timer, setTimer] = useState<string>("");
  const [controllId, setControllId] = useState<number>(0);
  const [scheduledBoom, setScheduledBoom] = useState<ScheduledBoom | null>(
    null
  );

  const router = useRouter();
  const [previousScheduledBoom, setPreviousScheduledBoom] =
    useState<ScheduledBoom | null>(null);

  const getScheduledBoom = async () => {
    const token = Cookies.get("token") || "";
    const newScheduledBoom = await BoomController.getNextScheduledBoom(token);
    if (newScheduledBoom === null) {
      setScheduledBoom(null);
      return;
    }
    setScheduledBoom(newScheduledBoom);
  };

  const getLeaderboard = async () => {
    const leaderBoardResponse = await LeaderboardController.getLeaderboard();
    setLeaderboardList(leaderBoardResponse);
    setTop3List(leaderBoardResponse.slice(0, 3));
    const firstIndex = (LEADERBOARD_CONTROLL as any)[controllId][0];
    const secondIndex = (LEADERBOARD_CONTROLL as any)[controllId][1];
    setFilteredLeaderboardList(
      leaderBoardResponse.slice(firstIndex, secondIndex)
    );
    const newControllId = controllId === 2 ? 0 : controllId + 1;
    setControllId(newControllId);
    getScheduledBoom();
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  const goToBoomPage = () => {
    localStorage.setItem("scheduledBoom", JSON.stringify(scheduledBoom));
    router.replace("/boom");
  };

  const updateBoomTimer = () => {
    if (scheduledBoom === null) {
      if (previousScheduledBoom !== null) {
        const previousScheduledBoomStartDate = moment(
          previousScheduledBoom.startDate
        );
        console.log(
          "previousScheduledBoomStartDate:",
          previousScheduledBoomStartDate
        );
        const now = moment();

        const previousDiff = previousScheduledBoomStartDate.diff(now);
        console.log("previousDiff:", previousDiff);
        if (previousDiff < 2000) {
          goToBoomPage();
        }
      }
      setTimer("");
      return;
    }
    setPreviousScheduledBoom({ ...scheduledBoom });
    const scheduledBoomStartDate = moment(scheduledBoom.startDate);
    const now = moment();
    const diff = scheduledBoomStartDate.diff(now);
    const newTimer = moment(diff).format("mm:ss");
    if (diff < 0) {
      goToBoomPage();
      setTimer("");
      setPreviousScheduledBoom(null);
      setScheduledBoom(null);
      return;
    }
    setTimer(newTimer);
  };

  useInterval(() => {
    updateBoomTimer();
  }, 1000);

  useInterval(() => {
    getLeaderboard();
  }, 15000);

  const colors = ["bg-red", "bg-blue", "bg-green", "bg-yellow"];

  const renderFilteredLeaderBoard = () => {
    return (
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          {filteredLeaderboardList
            .slice(0, LEADERBOARD_SIZE / 2)
            .map((score: Score, listIndex: number) => (
              <div
                className={`flex flex-row justify-between pt-4 pb-4 pr-6 pl-6 ${
                  colors[listIndex % colors.length]
                }`}
                key={score.position}
              >
                <div className="flex flex-row">
                  <div className="font-bold pr-6 text-4xl">
                    {score.position}
                  </div>
                  <div className="text-4xl">{score.login}</div>
                </div>
                <div className="text-4xl">{score.score}</div>
              </div>
            ))}
        </div>
        <div className="flex flex-col w-1/2 pl-4">
          {filteredLeaderboardList
            .slice(LEADERBOARD_SIZE / 2, LEADERBOARD_SIZE)
            .map((score: Score, listIndex: number) => (
              <div
                className={`flex flex-row justify-between pt-4 pb-4 pr-6 pl-6 ${
                  colors[listIndex % colors.length]
                }`}
                key={score.position}
              >
                <div className="flex flex-row">
                  <div className="font-bold pr-6 text-4xl">
                    {score.position}
                  </div>
                  <div className="text-4xl">{score.login}</div>
                </div>
                <div className="text-4xl">{score.score}</div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex h-screen flex-col bg-cover justify-between bg-[url('./img/bg.png')]">
        <div>
          <div className="grid grid-cols-3 mt-6">
            <div className="mt-8 flex items-baseline justify-center">
              <img src={"images/leaderboard/cloud.png"} />
            </div>
            <div className="flex items-baseline justify-center">
              <img src={"images/leaderboard/sao-login-group.png"} />
            </div>
            <div className="flex flex-col items-center justify-normal">
              <div className="w-full flex justify-end pr-28">
                <img src={"images/leaderboard/cloud.png"} />
              </div>
              <div className="w-full">
                <img src={"images/leaderboard/cloud.png"} />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5 pl-20 pr-20">
            <div className="pr-16 w-2/3 mt-[-35px]">
              <div className="mb-[10px]">
                <span className="text-4xl font-bold">RANKING</span>
              </div>
              <div>{renderFilteredLeaderBoard()}</div>
            </div>
            <div className="w-1/3">
              <div className="h-[270px] bg-white rounded-2xl border-black border flex items-center w-full p-10 pr-5">
                <div className="mr-10">
                  <img src={"images/leaderboard/crown.png"} />
                </div>
                <div className="w-2/3">
                  <div className="flex flex-col">
                    {top3List.map((score: Score, id: number) => (
                      <div className="mt-3 flex justify-between" key={id}>
                        <div className="flex">
                          <div className="font-bold mr-8 text-4xl flex items-center">
                            <div>{id + 1}</div>
                          </div>
                          <div className="text-4xl break-all pr-2">
                            {score.login}
                          </div>
                        </div>
                        <div className="flex items-center ml-4">
                          <span className="text-4xl">{score.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {timer && (
                <div className="grid grid-cols-2 mt-5 h-[125px] gap-3">
                  <div className="flex items-center text-2xl">
                    <span className="text-4xl">
                      PREPARE-SE! <br /> PRÓXIMO BOOM EM:
                    </span>
                  </div>
                  <div className="bg-white rounded-2xl border-black border flex items-center justify-center">
                    <div className="text-5xl">{timer}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-screen h-[79px] bg-[url('./img/mario-footer.png')]" />
      </div>
    </>
  );
};

export default WithAuthentication(Leaderboard, []);
