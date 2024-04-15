import Button from "@/components/ui/Button/Button";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../GamePage/GamePage";

const AddPlayers = () => {
  const params = useParams();
  const gameId = params.id;
  const [user, setUser] = useState<User>({ email: "" });
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await AuthClient.get("/users");
        const userEmail = userResponse.data.email;
        if (userResponse.status === 200) {
          setUser({ email: userEmail });
        }

        const response = await AuthClient.get(`/event/${gameId}`);
        if (response.status === 200) {
          console.log(response.data);
          const flag1 =
            (response.data.emails &&
              !!response.data.emails.find((email) => email === user.email)) ||
            false;

          setFlag(flag1);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        enqueueSnackbar("Что-то пошло не так", { variant: "error" });
      }
    };

    fetchData();
  }, [gameId]);

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[132px] px-[190px] rounded-[20px] mx-auto mb-[5rem]">
      <h1 className="font-bold text-[38px] text-[#333333] mb-12">
        Добавить участников
      </h1>
      <div className="flex flex-col gap-[30px] w-[400px]">
        {flag && (
          <Button className="text-[18px] px-[20px]">
            <Link to={`/game/${gameId}/wishlist`}>
              Создать свою карточку участника
            </Link>
          </Button>
        )}
        <Button className="text-[18px] px-[20px]">
          <Link to={`/game/${gameId}/invitations`}>
            Добавить участников вручную
          </Link>
        </Button>
        <Button className="text-[18px] px-[20px]">
          <Link to={`/game/${gameId}/invite`}>Пригласить по ссылке</Link>
        </Button>
      </div>
    </div>
  );
};

export default AddPlayers;
