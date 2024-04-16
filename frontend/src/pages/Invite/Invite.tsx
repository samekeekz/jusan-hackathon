import ButtonLink from "@/components/ui/ButtonLink/ButtonLink";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";

const Invite = () => {
  const { id } = useParams();
  const link = `https://secret-santa-jusan.vercel.app/game/${id}`;

  const handleClick = () => {
    navigator.clipboard.writeText(link);
    enqueueSnackbar("Ссылка скопирована", { variant: "success" });
  };

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] text-center rounded-[20px] mx-auto">
      <h1 className="text-[40px] leading-[34px] font-bold text-[#333333] mb-14">
        Пригласить участников
      </h1>
      <p className="text-[20px] leading-[34px] text-[#333333] mb-14">
        Cкопируйте ссылку ниже и отправьте её своим друзьям. <br /> После
        перехода по ссылке, участники смогут создать карточки для участия
        самостоятельно
      </p>
      <input
        type="text"
        value={link}
        readOnly
        id="password"
        className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-6 py-[18px] font-medium text-[#333333] text-2xl appearance-none whitespace-nowrap overflow-hidden text-ellipsis mb-16"
        onClick={handleClick}
      />
      <ButtonLink link={`/game/${id}`}>Назад</ButtonLink>
    </div>
  );
};

export default Invite;
