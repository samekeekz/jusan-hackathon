import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Game } from "../MyGames/MyGames";
import { AuthClient } from "@/context/AuthProvider";
import Message from "@/components/Message/Message";
import { PacmanLoader } from "react-spinners";
import { enqueueSnackbar } from "notistack";

type User = {
  email: string;
};

const GamePage = () => {
  const [game, setGame] = useState<Game | null>(null);
  const params = useParams();
  const gameId = params.id;
  const [user, setUser] = useState<User>({ email: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cardNeccessary, setCardNeccessary] = useState<boolean>(false);

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
          setGame(response.data);
          console.log(response.data);
          const flag =
            (response.data.emails &&
              !!response.data.emails.find((email) => email === user.email)) ||
            false;

          setCardNeccessary(flag);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        enqueueSnackbar("Что-то пошло не так", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameId]);

  return (
    <div className="flex flex-col items-center">
      {!isLoading ? (
        game && game.active ? (
          game?.owner_email !== user.email ? (
            cardNeccessary ? (
              <Message
                title={`${user.email} приглашает вас в игру!`}
                label={`Автор: ${game.owner_email}`}
                smallText="Жеребьевка еще не состоялась"
                linkText="Принять участие"
                link={`/game/${gameId}/wishlist`}
                gameTitle={game.name}
                organiser_email={game.owner_email}
              />
            ) : (
              <Message
                title={`${user.email} приглашает вас в игру!`}
                label={`Автор: ${game.owner_email}`}
                smallText="Жеребьевка еще не состоялась"
                linkText="Вернуться в мои игры"
                link={`/mygames`}
                gameTitle={game.name}
                organiser_email={game.owner_email}
              />
            )
          ) : (
            <Message
              title="Вы создали игру"
              label="Пока что никого нет"
              linkText="Добавить участников"
              smallText="Добавьте участников, чтоб игра началась"
              link={`/game/${gameId}/addPlayers`}
            />
          )
        ) : (
          <Message
            title="Игра не активна"
            label="Жеребевка завершена"
            linkText="Узнать подопечного"
          />
        )
      ) : (
        <PacmanLoader size={50} color="#FF6300" />
      )}
    </div>
  );
};

export default GamePage;
