import React from "react";
import MessageTitle from "../MessageTitle/MessageTitle";
import MessageText from "../MessageText/MessageText";
import ImageSanta from "../ImageSanta/ImageSanta";
import ButtonLink from "../ui/ButtonLink/ButtonLink";
import Button from "../ui/Button/Button";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";

type GamePanelProps = {
  title?: string;
  label?: string;
  smallText?: string;
  link1Text?: string;
  link2Text?: string;
  link1?: string;
  link2?: string;
  id: string;
  shufflingStarted: boolean;
  setShufflingStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const GamePanel: React.FC<GamePanelProps> = ({
  title,
  label,
  smallText,
  link1Text,
  link1,
  id,
  shufflingStarted,
  setShufflingStarted,
}) => {
  const handleClick = async () => {
    setShufflingStarted(true);
    try {
      const res = await AuthClient.post(`/event/shuffle/${id}`);

      if (res.status === 200) {
        enqueueSnackbar("Жеребьевка началась", { variant: "success" });
        console.log("Shuffle response:", res.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setShufflingStarted(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto">
      <MessageTitle title={title} className="mb-6" />
      <ImageSanta className="mb-5" />
      <MessageText smallText={smallText} label={label} className="mb-5" />
      <ButtonLink link={link1}>{link1Text}</ButtonLink>
      <Button
        onClick={handleClick}
        className="mt-3 bg-[#5AB9BF] hover:bg-[#5AB9BF]"
      >
        {shufflingStarted ? "Идёт жеребьевка" : "Начать жеребьевку"}
      </Button>
    </div>
  );
};

export default GamePanel;
