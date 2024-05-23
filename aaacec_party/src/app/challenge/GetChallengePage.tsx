import { Pages } from "./page";

export default function GetChallengePage({
  setPage,
}: {
  setPage: (page: Pages) => void;
}) {
  return (
    <div className="h-screen-with-navbar flex justify-between flex-col">
      get challenge page component
      <div
        onClick={() => setPage(Pages.LOGINS)}
        className="w-screen h-14 bg-gray-600 flex justify-center items-center text-lg cursor-pointer"
      >
        Atribuir pontos
      </div>
    </div>
  );
}
