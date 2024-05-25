"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { AAACECRole } from "../domain/aaacec_roles";
import WithAuthentication from "../middleware/WithAuthentication";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LeaderboardController, {
  Score,
} from "../controllers/LeaderboardController";
import cloud from "../img/cloud.png";

const Leaderboard = () => {
  const [leaderboardList, setLeaderboardList] = useState<Score[]>([]);
  const [top3List, setTop3List] = useState<Score[]>([]);
  const [timer, setTimer] = useState<string>("7:34");

  const getLeaderboard = async () => {
    const leaderBoardResponse = await LeaderboardController.getLeaderboard();
    setLeaderboardList(leaderBoardResponse);
    console.log("leaderBoardResponse:", leaderBoardResponse);
    setTop3List(leaderBoardResponse.slice(0, 3));
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

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
            {/* {leaderboardList.map((score: Score) => (
            <div>{score.login}</div>
          ))} */}
          </div>
          <div className="grid gap-3 grid-cols-2 mt-5 pl-20 pr-20">
            <div>
              <span>Ranking</span>
              <div>leaderboard</div>
            </div>
            <div>
              <div className="h-[226px] bg-white rounded-2xl border-black border flex items-center w-full p-14">
                <div className="mr-14">
                  <img src={"images/leaderboard/crown.png"} />
                </div>
                <div className="w-[300px]">
                  <div className="flex flex-col">
                    {top3List.map((score: Score, id: number) => (
                      <div className="mt-3 flex justify-between">
                        <div>
                          <span className="font-bold mr-8">{id}</span>
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
