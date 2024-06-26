import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

type Gift = {
  description: string;
  priority: number;
};

const Wishlist = () => {
  const params = useParams();
  const gameId = params.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [gifts, setGifts] = useState<Gift[]>([
    { description: "", priority: 1 },
  ]);

  const addGift = () => {
    setGifts((prevGifts) => [
      ...prevGifts,
      { description: "", priority: prevGifts.length + 1 },
    ]);
  };

  const handleChange = (index: number, field: keyof Gift, value: string) => {
    setGifts((prevGifts) => {
      const updatedGifts = [...prevGifts];
      updatedGifts[index] = {
        ...updatedGifts[index],
        [field]: value,
      };
      return updatedGifts;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const eventData = {
        event_id: gameId,
        gifts: gifts.map((gift) => ({
          description: gift.description,
        })),
      };
      const res = await AuthClient.post("/event/card", eventData);
      if (res.status === 200) {
        enqueueSnackbar("Пожелания к подарку отправлены", {
          variant: "success",
        });
        setLoading(false);
        navigate("/mygames");
      }
      console.log(res.data);
    } catch (error) {
      console.error("Error sending gifts:", error);
      enqueueSnackbar("Что-то пошло не так", { variant: "error" });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
      <h1 className="font-bold text-[38px] text-[#333333] mb-12">
        Пожелания к подарку
      </h1>
      <p className="">Выберите подарки, которые хотели бы получить</p>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {gifts.map((gift, index) => (
          <div key={index} className="mb-10 self-stretch">
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
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
          </div>
        ))}
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={addGift}
        >
          <div className="w-10 h-10 self-center rounded-full bg-[#FF6300] font-bold text-[30px] flex items-center justify-center text-white">
            +
          </div>
          <p className="text-[20px] leading-[34px] text-[#333333]">
            Добавить еще подарки
          </p>
        </div>
        <Button type="submit" className="mt-10 mb-4 self-center px-20">
          {loading ? "Идет сохранениe" : "Далее"}
        </Button>
      </form>
    </div>
  );
};

export default Wishlist;
