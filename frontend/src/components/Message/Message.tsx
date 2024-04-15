import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button/Button";
import MessageTitle from "../MessageTitle/MessageTitle";
import MessageText from "../MessageText/MessageText";
import ImageSanta from "../ImageSanta/ImageSanta";
import GameTitle from "../GameTitle/GameTitle";

type MessageProps = {
  title?: string;
  label?: string;
  smallText?: string;
  linkText?: string;
  link?: string;
  gameTitle?: string;
  organiser_email?: string;
};

const Message: React.FC<MessageProps> = ({
  title,
  label,
  smallText,
  linkText = "На главную",
  link = "/",
  gameTitle,
  organiser_email,
}) => {
  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto">
      <MessageTitle title={title} className="mb-6" />
      {gameTitle && organiser_email && (
        <GameTitle gameTitle={gameTitle} organiser_email={organiser_email} />
      )}
      <ImageSanta className="mb-5" />
      <MessageText smallText={smallText} label={label} className="mb-5" />
      <Button>
        <Link
          to={link}
          className="block leading-8 cursor-pointer disabled:cursor-not-allowed"
        >
          <span className="font-bold">{linkText}</span>
        </Link>
      </Button>
    </div>
  );
};

export default Message;
