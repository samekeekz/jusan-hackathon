import GameTitle from "@/components/GameTitle/GameTitle";
import Button from "@/components/ui/Button/Button";
import ButtonLink from "@/components/ui/ButtonLink/ButtonLink";
import { AuthClient } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../MyGames/MyGames";

export interface Receiver {
  receiverEmail: string;
  receiverName: string;
  receiverGiftList: ReceiverGiftList[];
}

export interface ReceiverGiftList {
  description: string;
  card_id: number;
  priority: number;
}

const ReceiverPage = () => {
  const { id } = useParams();
  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await AuthClient.get(`/event/my-receiver/${id}`);
        if (res.status === 200) {
          const data = res.data;
          setReceiver(data);
          console.log("Receiver data:", data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await AuthClient.get(`/event/${id}`);
        if (res.status === 200) {
          const data = res.data;
          setGame(data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetchGame();
  }, [id]);

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto">
      <GameTitle gameTitle="gameTitle" organiser_email="organiser_email" />
      {receiver && (
        <>
          <h3 className="text-[20px] text-[#333333] font-bold leading-[34px] mt-6 mb-[60px]">
            Карточка {receiver.receiverName}
          </h3>
          {game && game.isLimited && (
            <div className="flex items-center gap-3 mb-11">
              <div className="shrink-0 bg-[#FF6300] w-10 h-10 rounded-full flex items-center justify-center font-bold text-[40px] leading-[34px] text-white">
                !
              </div>
              <p className="text-[15px] leading-[34px] text-[#333333] text-center">
                Организатор установил ограничение на сумму подарка в{" "}
                {game.price} тг. <br />
                Учитывайте это ограничение при выборе подарка
              </p>
            </div>
          )}
          {receiver.receiverGiftList.length > 0 &&
            receiver.receiverGiftList.map((gift, index) => (
              <div key={index} className="mb-6 self-stretch">
                <div className="flex justify-between items-center mb-[3px]">
                  <label
                    htmlFor={`p${index + 1}`}
                    className="ml-[2px] text-[#333333] text-2xl text-left self-start"
                  >{`Подарок №${index + 1}`}</label>
                </div>
                <input
                  type="text"
                  id={`p${index + 1}`}
                  required
                  className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl"
                  value={gift.description}
                  readOnly
                />
              </div>
            ))}
          <div className="mt-[60px] flex items-center gap-5">
            <Button>Подарок отправлен</Button>
            <ButtonLink
              className="bg-white border-[#FF6300] border-solid border-[3px] hover:bg-white text-[#FF6300]"
              link="/mygames"
            >
              На главную
            </ButtonLink>
          </div>
        </>
      )}
    </div>
  );
};

export default ReceiverPage;
