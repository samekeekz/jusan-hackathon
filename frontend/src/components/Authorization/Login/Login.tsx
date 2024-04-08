import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button/Button"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const schema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: "Это поле обязательно" })
        .email({ message: "Неправильная почта" }),
    password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

type SchemaType = z.infer<typeof schema>;


const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SchemaType>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<SchemaType> = async (data: SchemaType) => {
        console.log(data);

    }

    return (
        <div className="bg-white flex flex-col items-center w-[850px] pt-[66px] pb-[133px] px-[90px] rounded-[20px]">
            <h1 className="font-bold text-[38px] text-[#333333] mb-12">Вход</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="email" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Ваш E-mail</label>
                        {errors.email && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <input {...register("email")}
                        type="text" id="email" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl" />
                </div>
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-[3px]">
                        <label htmlFor="password" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Пароль</label>
                        {errors.password && (
                            <p className="text-[#FF0000] font-medium text-lg leading-8 self-start">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <input {...register("password")}
                        type="password" id="password" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl appearance-none" />
                </div>
                <p className="text-[#979797] leading-8 cursor-pointer text-center underline mb-14">Забыли пароль?</p>
                <Button className="mb-4 self-center px-20">Войти</Button>
            </form>
            <Link to="/" className="text-[#979797] leading-8 cursor-pointer">Продолжая, вы даете согласие на <span className="font-bold underline">Oбработку персональных данных.</span></Link>
        </div>
    )
}

export default Login;