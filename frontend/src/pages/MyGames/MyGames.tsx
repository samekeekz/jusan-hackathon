import Button from "@/components/ui/Button/Button";
import gamesPagePicture from "../../assets/icons/gamesPagePicture.svg";
import { useEffect, useState } from "react";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";

export type Games = Game[];

export type Game = {
  name: string;
  owner_email: string;
  identificator: string;
  isLimited: boolean;
  price: number;
  currencyType: string;
  active: boolean;
  playersNumber: number;
  emails: string[];
};

type User = {
  email: string;
};

const MyGames = () => {
  const [games, setGames] = useState<Games>([]);
  const [user, setUser] = useState<User>({ email: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await AuthClient.get("/users");
        const userEmail = userResponse.data.email;
        setUser({ email: userEmail });

        const eventsResponse = await AuthClient.get("/event");
        if (eventsResponse.status === 200) {
          setGames(eventsResponse.data);
          console.log(eventsResponse.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Что-то пошло не так", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-white max-w-[850px] min-h-[760px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
      {isLoading ? (
        <PacmanLoader size={50} color="#FF6300" />
      ) : games.length === 0 ? (
        <>
          <Button className="font-normal text-[25px] px-[72px] py-4 min-w-[484px] mb-[41px]">
            Мои игры
          </Button>

          <img
            src={gamesPagePicture}
            alt="Games page picture"
            className="mb-[19px]"
          />

          <div className="text-center mb-[30px]">
            <p className="mb-1 font-bold">Пока что Вы не участвуете в играх</p>
            <p>Создайте или вступите в игру, чтоб принять участие</p>
          </div>

          <Button className="font-normal border-solid border-[3px] border-[#FF6300] bg-white text-[25px] text-[#FF6300] px-[42px] py-2 mb-[70px]">
            <Link to="/createGame">Создать игру</Link>
          </Button>
        </>
      ) : (
        <>
          <Button className="font-normal text-[25px] px-[72px] py-3 min-w-[630px] mb-[54px]">
            Мои игры
          </Button>
          {games.length > 0 && (
            <section className="grid grid-cols-2 grid-rows-2 gap-y-8 gap-x-5">
              {games.map((game) => (
                <Link
                  key={game.identificator}
                  to={`/game/${game.identificator}`}
                  state={{ gameId: game.identificator }}
                >
                  <div className="min-w-[307px] h-[220px] border-solid border-[3px] rounded-[25px] border-[#C0E3E5] cursor-pointer">
                    <div className="px-[53px] p-[23px] text-center flex flex-col justify-between h-[100%]">
                      <p className="text-[#FF6300] font-bold text-[25px]">
                        {game.name}
                      </p>
                      <p className="text-[14px] text-[#979797] leading-6 font-bold">
                        {game.owner_email === user.email
                          ? "Вы организатор"
                          : " Вы участник"}{" "}
                        <br /> {game.playersNumber}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default MyGames;
