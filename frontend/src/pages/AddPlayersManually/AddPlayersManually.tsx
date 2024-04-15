import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

const AddPlayersManually = () => {
  const params = useParams();
  const gameId = params.id;
  const navigate = useNavigate();

  const [emails, setEmails] = useState<string[]>([""]);

  const addEmailInput = () => {
    setEmails((prevEmails) => [...prevEmails, ""]);
  };

  const handleChange = (index: number, email: string) => {
    setEmails((prevEmails) => {
      const updatedEmails = [...prevEmails];
      updatedEmails[index] = email;
      return updatedEmails;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const eventData = {
        event_id: gameId,
        emails: emails.filter((email) => email.trim() !== ""),
      };
      const res = await AuthClient.post("/event/send-invitations", eventData);
      if (res.status === 200) {
        enqueueSnackbar("Invitations sent successfully", {
          variant: "success",
        });
        navigate("/mygames");
      }
    } catch (error) {
      console.error("Error sending invitations:", error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
      <h1 className="font-bold text-[38px] text-[#333333] mb-12">
        Добавить участников
      </h1>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {emails.map((email, index) => (
          <div key={index} className="mb-10 self-stretch">
            <div className="flex justify-between items-center mb-[3px]">
              <label
                htmlFor={`email${index + 1}`}
                className="ml-[2px] text-[#333333] text-2xl text-left self-start"
              >{`Участник №${index + 1}`}</label>
            </div>
            <input
              type="email"
              id={`email${index + 1}`}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              required
              className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl"
              value={email}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={addEmailInput}
        >
          <div className="w-10 h-10 self-center rounded-full bg-[#FF6300] font-bold text-[30px] flex items-center justify-center text-white">
            +
          </div>
          <p className="text-[20px] leading-[34px] text-[#333333]">
            Добавить еще участника
          </p>
        </div>
        <Button type="submit" className="mt-10 mb-4 self-center px-20">
          Пригласить
        </Button>
      </form>
    </div>
  );
};

export default AddPlayersManually;
