import React, { useState } from "react";
import MessageTitle from "../MessageTitle/MessageTitle";
import MessageText from "../MessageText/MessageText";
import ButtonLink from "../ui/ButtonLink/ButtonLink";
import Button from "../ui/Button/Button";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import GameSantaImage from "../GameSantaImage/GameSantaImage";

type GamePanelProps = {
  title?: string;
  label?: string;
  smallText?: string;
  link1Text?: string;
  link1?: string;
  users?: string[];
  isAuthor?: boolean;
  id: string;
  shufflingStarted?: boolean;
  setShufflingStarted?: React.Dispatch<React.SetStateAction<boolean>>;
  onItemDeleted?: () => void;
};

const GamePanel: React.FC<GamePanelProps> = ({
  title,
  label,
  smallText,
  link1Text,
  link1,
  users,
  id,
  isAuthor,
  shufflingStarted,
  setShufflingStarted,
  onItemDeleted,
}) => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const visibleUsers = users && showAllUsers ? users : users?.slice(0, 10);

  console.log("GamePanel users:", users);

  const handleClick = async () => {
    setShufflingStarted(true);
    try {
      const res = await AuthClient.post(`/event/shuffle/${id}`);

      if (res.status === 200) {
        enqueueSnackbar("Жеребьевка завершена", { variant: "success" });
        console.log("Shuffle response:", res.data);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setShufflingStarted(false);
    }
  };

  const handleRemove = async (email: string) => {
    try {
      const res = await AuthClient.delete(`/event/delete/card/${id}`, {
        data: { email: email },
      });

      if (res.status === 200) {
        enqueueSnackbar("Участник удалён", { variant: "success" });
        console.log("Remove response:", res.data);
        if (onItemDeleted) onItemDeleted();
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white w-[850px] min-h-[800px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-10">
      <MessageTitle title={title} className="mb-6" />
      <GameSantaImage className="mb-5" />
      {visibleUsers && visibleUsers?.length > 0 && (
        <>
          <p className="text-[#333333] text-[20px] leading-[34px] mb-2">
            Участники {users?.length}
          </p>
          <ul className="flex justify-center w-full gap-3 flex-wrap mb-4">
            {visibleUsers?.map((email) => (
              <li
                className="flex gap-2 items-center px-4 py-0.5 bg-[#01787E] font-bold rounded-[20px] text-white text-[20px] leading-[34px]"
                key={email}
                title={email}
              >
                <p>{email}</p>
                {isAuthor && (
                  <div
                    className="cursor-pointer mt-[3px]"
                    onClick={() => handleRemove(email)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      strokeWidth="5"
                      stroke="#ffffff"
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hover:stroke-current hover:text-gray-900 transition-colors duration-200 ease-in-out"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M18 6l-12 12" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {!showAllUsers && users?.length > 10 && (
            <button
              className="border-none bg-transparent hover:underline text-[#979797] text-[20px] leading-[34px] mt-7"
              onClick={() => setShowAllUsers(true)}
            >
              Показать всех
            </button>
          )}
        </>
      )}
      <MessageText smallText={smallText} label={label} className="mb-5" />
      <ButtonLink link={link1}>{link1Text}</ButtonLink>
      {users?.length > 2 && isAuthor && (
        <Button
          onClick={handleClick}
          className="mt-3 bg-[#5AB9BF] hover:bg-[#5AB9BF]"
        >
          {shufflingStarted ? "Идёт жеребьевка" : "Начать жеребьевку"}
        </Button>
      )}
    </div>
  );
};

export default GamePanel;
