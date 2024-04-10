import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";


const schemaAccountDetails = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Это поле обязательно" }),
    email: z
        .string()
        .trim()
        .min(1, { message: "Это поле обязательно" })
        .email({ message: "Неправильная почта" }),
});

const schemaPassword = z.object({
    password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
    password2: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

type SchemaPasswordType = z.infer<typeof schemaPassword>;
type SchemaAccountDetailsType = z.infer<typeof schemaAccountDetails>;

const MyCabinet = () => {
    const form1 = useForm<SchemaAccountDetailsType>({
        resolver: zodResolver(schemaAccountDetails),
    });

    const form2 = useForm<SchemaPasswordType>({
        resolver: zodResolver(schemaPassword),
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthClient.get("/users");
                console.log(response.data);
                form1.setValue("name", response.data.name);
                form1.setValue("email", response.data.email);
            } catch (error) {
                console.error("Error fetching data:", error);
                enqueueSnackbar("Ошибка при загрузке данных", { variant: "error" });
            }
        };

        fetchData();
    }, [])


    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            <h1 className="font-bold text-[30px] text-[#333333] mb-11">Личные данные</h1>
            <form className="w-full flex flex-col mb-24">
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="name" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Ваше Имя</label>
                        {form1.formState.errors.name && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {form1.formState.errors.name.message}
                            </p>
                        )}
                    </div>
                    <input {...form1.register("name")}
                        type="text" id="name" placeholder="*Имя Фамилия*" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl" />
                </div>
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="email" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Ваш E-mail</label>
                        {form1.formState.errors.email && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {form1.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                    <input {...form1.register("email")}
                        placeholder="example@gmail.com"
                        type="email" id="email" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl appearance-none" />
                </div>
                <button className="border-none bg-transparent text-[#979797] text-[20px] leading-[34px] mt-7">Сохранить</button>
            </form>

            <h1 className="font-bold text-[30px] text-[#333333] mb-11">Пароль</h1>
            <form className="w-full flex flex-col mb-[100px]">
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="email" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Новый Пароль</label>
                        {form2.formState.errors.password && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {form2.formState.errors.password.message}
                            </p>
                        )}
                    </div>
                    <input {...form2.register("password")}
                        type="password" id="password" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl" />
                </div>
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="password" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Повторите пароль</label>
                        {form2.formState.errors.password2 && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {form2.formState.errors.password2.message}
                            </p>
                        )}
                    </div>
                    <input {...form2.register("password2")}
                        type="password" id="password2" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl appearance-none" />
                </div>
                <button className="border-none bg-transparent text-[#979797] text-[20px] leading-[34px] mt-7">Сохранить</button>
            </form>

            <Button className="bg-[#FF0000] font-normal text-[25px] px-[72px] py-4">Удалить аккаунт</Button>
        </div>
    )
}

export default MyCabinet;