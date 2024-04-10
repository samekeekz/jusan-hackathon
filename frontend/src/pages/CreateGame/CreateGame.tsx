import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

const schema = z.object({
    title: z.string().trim().min(3, { message: "Минимальная длина 3 символа" }).max(50, { message: "Максимальная длина 50 символов" }),
    identificator: z.string().trim().min(10, { message: "Минимальная длина 3 символа" }).max(10, { message: "Максимальная длина 10 символов" }),
});

type SchemaType = z.infer<typeof schema>;


const CreateGame = () => {
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SchemaType>({
        resolver: zodResolver(schema),
    });


    const generateIdentificator = useMemo((): string => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let identificator = "";
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            identificator += characters[randomIndex];
        }
        return identificator;
    }, []);




    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            <h1 className="font-bold text-[38px] text-[#333333] mb-12">Создать игру</h1>
            <form className="w-full flex flex-col">
                <div className="mb-7">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="title" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Название игры</label>
                        {errors.title && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    <input {...register("title")}
                        type="text" id="title" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl" />
                </div>
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="text" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Идентификатор</label>
                        {errors.identificator && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {errors.identificator.message}
                            </p>
                        )}
                    </div>
                    <input {...register("identificator")} value={generateIdentificator}
                        type="text" id="identificator" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#333333] text-2xl appearance-none" />
                </div>
                <p className="mb-6 text-[#979797] text-[10px] font-bold leading-[34px] text-center">Придумайте уникальный идентификатор для коробки, который будет указываться в ссылке</p>

                <input placeholder="Максимальная стоимость подарка" type="text" id="identificator" className="w-full placeholder:text-[#333333] text-[#333333] border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[] text-2xl appearance-none" />
                <p className="mb-16 text-[#979797] text-[10px] font-bold leading-[34px] text-center">При включенной опции участникам будет показано ограничение, которому они должны будут следовать</p>

                <Button className="mb-4 self-center px-10">Создать игру</Button>
            </form>
        </div>
    )
}

export default CreateGame;