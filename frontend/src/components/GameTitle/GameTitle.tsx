import { Link } from "react-router-dom";

type Props = {
  gameTitle: string;
  organiser_email: string;
};

const GameTitle = ({ gameTitle, organiser_email }: Props) => {
  return (
    <div className="flex gap-5 w-[670px] border-[3px] border-[#FF6300] border-solid rounded-[20px] px-8 py-4 mb-3">
      <div className="w-[56px] h-[56px] bg-[#FF6300] rounded-full"></div>
      <div className="flex flex-col">
        <p className="text-[25px] text-[#333333] leading-[34px]">{gameTitle}</p>
        <Link
          className="text-[18px] text-[#3E3B3B] leading-[34px] outline"
          to={`mailto:${organiser_email}`}
        >
          Связаться с Организатором
        </Link>
      </div>
    </div>
  );
};

export default GameTitle;
