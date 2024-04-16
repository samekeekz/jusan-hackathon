import React from "react";
import MessageTitle from "../MessageTitle/MessageTitle";
import MessageText from "../MessageText/MessageText";
import ImageSanta from "../ImageSanta/ImageSanta";
import GameTitle from "../GameTitle/GameTitle";
import ButtonLink from "../ui/ButtonLink/ButtonLink";
import IconExclamationPoint from "../IconExclamationPoint/IconExclamationPoint";

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
      {label === "Жеребьевка завершена" ? (
        <IconExclamationPoint />
      ) : (
        <ImageSanta className="mb-5" />
      )}
      <MessageText smallText={smallText} label={label} className="mb-5" />
      <ButtonLink link={link}>{linkText}</ButtonLink>
    </div>
  );
};

export default Message;
