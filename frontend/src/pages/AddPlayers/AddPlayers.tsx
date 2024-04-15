import Button from "@/components/ui/Button/Button";
import { Link, useParams } from "react-router-dom";

const AddPlayers = () => {
  const params = useParams();
  const gameId = params.id;

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[132px] px-[190px] rounded-[20px] mx-auto mb-[5rem]">
      <h1 className="font-bold text-[38px] text-[#333333] mb-12">
        Добавить участников
      </h1>
      <div className="flex flex-col gap-[30px] w-[400px]">
        <Button className="text-[18px] px-[20px]">
          <Link to={`/game/${gameId}/wishlist`}>
            Создать свою карточку участника
          </Link>
        </Button>
        <Button className="text-[18px] px-[20px]">
          <Link to={`/game/${gameId}/invitations`}>
            Добавить участников вручную
          </Link>
        </Button>
        <Button className="text-[18px] px-[20px]">
          <Link to="">Пригласить по ссылке</Link>
        </Button>
      </div>
    </div>
  );
};

export default AddPlayers;
