import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    name: z.string().trim().min(3, { message: "Минимальная длина 3 символа" }).max(50, { message: "Максимальная длина 50 символов" }),
    identificator: z.string().trim().min(10, { message: "Минимальная длина 3 символа" }).max(10, { message: "Максимальная длина 10 символов" }),
    price: z.coerce.number().positive({ message: "Должен быть больше 0" }).optional(),
});

type SchemaType = z.infer<typeof schema>;
type User = {
    email: string;
}

const CreateGame = () => {
    const [checked, setChecked] = useState(false);
    const [user, setUser] = useState<User>({ email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthClient.get("/users");
                console.log(response.data);
                setUser(response.data.email)
            } catch (error) {
                console.error("Error fetching data:", error);
                enqueueSnackbar("Ошибка при загрузке данных", { variant: "error" });
            }
        };

        fetchData();
    }, [])

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

    const postData = async (data: SchemaType) => {
        try {
            const response = await AuthClient.post("/event/create", {
                name: data.name,
                owner_email: user.email,
                identificator: data.identificator,
                isLimited: checked,
                price: data.price,
                currencyType: "KZT",
                active: true,
                playersNumber: 0
            });
            if (response.status !== 200) {
                enqueueSnackbar("Ошибка при создании игры", { variant: "error" });
            }
            enqueueSnackbar("Игра успешно создана", { variant: "success" });
            navigate("/mygames");
            console.log(response.data);
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Ошибка при создании игры", { variant: "error" });
        }
    }

    const [value, setValue] = useState(generateIdentificator);


    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            <h1 className="font-bold text-[38px] text-[#333333] mb-12">Создать игру</h1>
            <form onSubmit={handleSubmit(postData)} className="w-full flex flex-col">
                <div className="mb-7">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="title" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Название игры</label>
                        {errors.name && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <input {...register("name")}
                        type="text" id="name" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl" />
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
                    <input {...register("identificator")} value={value} onChange={(e) => setValue(e.target.value)}
                        type="text" id="identificator" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#333333] text-2xl appearance-none" />
                </div>
                <p className="mb-6 text-[#979797] text-[10px] font-bold leading-[34px] text-center">Придумайте уникальный идентификатор для коробки, который будет указываться в ссылке</p>
                <div className="flex justify-between items-center w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3">
                    <input readOnly placeholder="Максимальная стоимость подарка" type="text" id="identificator" className="w-full placeholder:text-[#333333] text-[#333333] text-2xl appearance-none cursor-default" />
                    <label onChange={() => setChecked(prev => !prev)} className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={checked} className="sr-only peer" />
                        <div className="relative w-20 h-10 transition-all bg-[#01787E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[#C0E3E5] after:content-[''] after:absolute after:top-[3px] after:start-[6px] after:bg-[#C0E3E5] after:border-gray-300 after:border after:rounded-full after:h-[34px] after:w-[34px] after:transition-all peer-checked:bg-[#5AB9BF]"></div>
                    </label>
                </div>
                <p className="mb-16 text-[#979797] text-[10px] font-bold leading-[34px] text-center">При включенной опции участникам будет показано ограничение, которому они должны будут следовать</p>

                {
                    checked && (
                        <div className={`w-[400px] self-center py-4 px-7 bg-white border-[#C0E3E5] ${errors.price ? "border-[#FF0000]" : ""}  $ border-[2px] solid rounded-[34px] mb-14`}>
                            <input type="number" id="price" {...register('price')} placeholder='Укажите максимальную стоимость подарка' className={`w-full border-none bg-transparent focus-visible:outline-none text-center text-[#333333] text-2xl placeholder:text-sm placeholder:font-bold ${errors.price ? "placeholder:text-[#BE081E]" : ""}`} />
                        </div>
                    )
                }

                <Button className="mb-4 self-center px-10">Создать игру</Button>
            </form>
        </div>
    )
}

export default CreateGame;