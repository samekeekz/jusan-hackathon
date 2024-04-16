import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../GamePage/GamePage";
import ButtonLink from "@/components/ui/ButtonLink/ButtonLink";
import { PacmanLoader } from "react-spinners";

const AddPlayers = () => {
  const params = useParams();
  const gameId = params.id;
  const [user, setUser] = useState<User>({ email: "" });
  const [flag, setFlag] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

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
          const flag1 =
            (response.data.emails &&
              !!response.data.emails.includes(user.email)) ||
            false;

          setFlag(flag1);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        enqueueSnackbar("Что-то пошло не так", { variant: "error" });
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId, user.email]);

  return (
    <div className="flex flex-col items-center relative bg-white max-w-[850px] min-h-[700px] py-[132px] px-[190px] rounded-[20px] mx-auto mb-[5rem]">
      {loading ? (
        <PacmanLoader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "100px",
          }}
          size={50}
          color="#FF6300"
        />
      ) : (
        <>
          <h1 className="font-bold text-center text-[38px] text-[#333333] mb-12">
            Добавить участников
          </h1>
          <div className="flex flex-col gap-[30px] w-[400px]">
            <ButtonLink link={`/game/${gameId}/wishlist`} disabled={flag}>
              Создать свою карточку участника
            </ButtonLink>
            <ButtonLink link={`/game/${gameId}/invitations`}>
              Добавить участников вручную
            </ButtonLink>
            <ButtonLink link={`/game/${gameId}/invite`}>
              Пригласить по ссылке
            </ButtonLink>
          </div>
        </>
      )}
    </div>
  );
};

export default AddPlayers;
