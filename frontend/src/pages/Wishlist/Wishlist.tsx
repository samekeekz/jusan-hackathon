import { useState } from 'react';
import Button from "@/components/ui/Button/Button";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { AuthClient } from '@/context/AuthProvider';
import { enqueueSnackbar } from 'notistack';

const Wishlist = () => {
  const [gifts, setGifts] = useState([{ id: uuidv4(), label: "Подарок №1" }]);

  const addGift = () => {
    const newGift = { id: uuidv4(), label: `Подарок №${gifts.length + 1}` };
    setGifts([...gifts, newGift]);
  };

  const sendGifts = () => {
    try {
      const res = AuthClient.post("event/create", {
        "event_id": "string",
        "gifts": [
          {
            "description": "string",
            "card_id": 0,
            "priority": 0
          }
        ]
      })
    }
    catch (error) {
      console.error("Error fetching data:", error);
      enqueueSnackbar("Что-то пошло не так", { variant: "error" });
    }
  };

  sendGifts();
  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
      <h1 className="font-bold text-[38px] text-[#333333] mb-12">Пожелания к подарку</h1>
      <p className="">Выберите подарки, которые хотели бы получить</p>
      <form className="w-full flex flex-col items-center">
        {gifts.map((gift, index) => (
          <div key={gift.id} className="mb-10 self-stretch">
            <div className="flex justify-between items-center mb-[3px]">
              <label htmlFor={`p${index + 1}`} className="ml-[2px] text-[#333333] text-2xl text-left self-start">{gift.label}</label>
            </div>
            <input
              type="text"
              id={`p${index + 1}`}
              required
              className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl"
            />
          </div>
        ))}
        <div className="flex gap-3 items-center cursor-pointer" onClick={addGift}>
          <div className="w-10 h-10 self-center rounded-full bg-[#FF6300] font-bold text-[30px] flex items-center justify-center text-white">+</div>
          <p className="font-bold text-[30px] text-[#333333]">Добавить еще подарки</p>
        </div>
        <Button className="mt-10 mb-4 self-center px-20">Далее</Button>
      </form>
    </div>
  );
};

export default Wishlist;
