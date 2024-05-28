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

const LEADERBOARD_SIZE = 10;

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
  const [timer, setTimer] = useState<string>("7:34");
  const [controllId, setControllId] = useState<number>(0);

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
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  useInterval(() => {
    getLeaderboard();
  }, 15000);

  const colors = ["bg-red", "bg-blue", "bg-green", "bg-yellow"];

  const renderFilteredLeaderBoard = () => {
    return (
      <div className="flex flex-col">
        {filteredLeaderboardList.map((score: Score, listIndex: number) => (
          <div
            className={`flex flex-row justify-between pt-2 pb-2 pr-6 pl-6 ${
              colors[listIndex % colors.length]
            }`}
          >
            <div className="flex flex-row">
              <div className="font-bold pr-6">{score.position}</div>
              <div>{score.login}</div>
            </div>
            <div>{score.score}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex h-screen flex-col bg-cover justify-between bg-[url('./img/bg.png')]">
        <div>
          {controllId}
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
                <span className="text-lg">RANKING</span>
              </div>
              <div>{renderFilteredLeaderBoard()}</div>
            </div>
            <div className="w-1/3">
              <div className="h-[226px] bg-white rounded-2xl border-black border flex items-center w-full p-14">
                <div className="mr-14">
                  <img src={"images/leaderboard/crown.png"} />
                </div>
                <div className="w-[300px]">
                  <div className="flex flex-col">
                    {top3List.map((score: Score, id: number) => (
                      <div className="mt-3 flex justify-between">
                        <div>
                          <span className="font-bold mr-8">{id + 1}</span>
                          <span>{score.login}</span>
                        </div>
                        <div>
                          <span>{score.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 mt-5 h-[125px]">
                <div className="flex items-center text-2xl">
                  <span>
                    PREPARE-SE! <br /> PRÓXIMO BOOM EM:
                  </span>
                </div>
                <div className="bg-white rounded-2xl border-black border flex items-center justify-center">
                  <div className="text-5xl">{timer}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen h-[79px] bg-[url('./img/mario-footer.png')]" />
      </div>
    </>
  );
};

export default Leaderboard;
