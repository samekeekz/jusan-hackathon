import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Game } from "../MyGames/MyGames";
import { AuthClient } from "@/context/AuthProvider";
import Message from "@/components/Message/Message";
import { PacmanLoader } from "react-spinners";
import { enqueueSnackbar } from "notistack";
import GamePanel from "@/components/GamePanel/GamePanel";

export type User = {
  email: string;
};

const GamePage = () => {
  const [game, setGame] = useState<Game | null>(null);
  const params = useParams();
  const gameId = params.id;
  const [user, setUser] = useState<User>({ email: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cardNeccessary, setCardNeccessary] = useState<boolean>(null);
  const [shufflingStarted, setShufflingStarted] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const userResponse = await AuthClient.get("/users");
      if (userResponse.status === 200) {
        const userEmail = userResponse.data.email;
        if (userEmail) {
          setUser({ email: userEmail });
        }
      }

      const response = await AuthClient.get(`/event/${gameId}`);
      if (response.status === 200) {
        const data = response.data;
        setGame(data);

        if (data && data.emails && user.email) {
          const flag = data.emails.includes(user.email);
          setCardNeccessary(flag);
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      enqueueSnackbar("Что-то пошло не так", { variant: "error" });
    }
  }, [gameId, user.email]);

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, [fetchData]);

  const handleItemDeleted = () => {
    fetchData().then(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col items-center">
      {!isLoading ? (
        game && game.active ? (
          game?.owner_email !== user.email ? (
            !cardNeccessary ? (
              <Message
                title={`${game.owner_email} приглашает вас в игру!`}
                label={`Автор: ${game.owner_email}`}
                smallText="Жеребьевка еще не состоялась"
                linkText="Принять участие"
                link={`/game/${gameId}/wishlist`}
                gameTitle={game.name}
                organiser_email={game.owner_email}
              />
            ) : (
              <GamePanel
                title={`${game.owner_email} приглашает вас в игру!`}
                smallText="Жеребьевка еще не состоялась"
                link1Text="Вернуться в мои игры"
                link1={`/mygames`}
                isAuthor={false}
                users={game.emails}
                id={gameId}
              />
            )
          ) : game.emails.length > 0 ? (
            <GamePanel
              title="Игра создана"
              link1Text="Добавить участников"
              link1={`/game/${gameId}/addPlayers`}
              id={gameId}
              users={game.emails}
              isAuthor={game?.owner_email === user.email}
              onItemDeleted={handleItemDeleted}
              shufflingStarted={shufflingStarted}
              setShufflingStarted={setShufflingStarted}
            />
          ) : (
            <GamePanel
              title="Игра активна"
              label="Пока что никого нет"
              smallText="Добавьте участников, чтоб игра началась"
              link1Text="Добавить участников"
              link1={`/game/${gameId}/addPlayers`}
              id={gameId}
            />
          )
        ) : (
          <Message
            gameTitle={game.name}
            organiser_email={game.owner_email}
            title="Игра не активна"
            label="Жеребьевка завершена"
            linkText="Узнать Подопечного"
            link={`/game/${gameId}/receiver`}
          />
        )
      ) : (
        <PacmanLoader size={50} color="#FF6300" />
      )}
    </div>
  );
};

export default GamePage;
