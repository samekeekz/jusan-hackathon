import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Santa from '@/assets/icons/messageSentSanta.svg';
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { AuthClient } from "@/context/AuthProvider";
const schema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: "Это поле обязательно" })
        .email({ message: "Неправильная почта" }),
});

type SchemaType = z.infer<typeof schema>;


const PasswordRecovery = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SchemaType>({
        resolver: zodResolver(schema),
    });

    const [messageSent, setMessageSent] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<SchemaType> = async (data: SchemaType) => {
        setLoading(true);
        try {
            const response = await AuthClient.post(`/auth/password-recovery`, {
                email: data.email
            },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            if (response.status === 200) {
                console.log('Success');
                setMessageSent(true);
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            {
                !messageSent ? (
                    <>
                        <h1 className="font-bold text-[38px] text-[#333333] mb-[106px]">Восстановление доступа</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
                            <div className="mb-6">
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
                            <p className="text-center text-[#979797] leading-8 cursor-pointer mb-20">Мы отправим ссылку с временным паролем на Вашу почту</p>
                            {
                                loading ? (
                                    <Button className="mb-4 self-center py-0 px-[97px]"><ThreeDots color="#ffffff" width={60} height={68} /></Button>
                                ) : (
                                    <Button className="mb-4 self-center px-20" disabled={loading}>Восстановить</Button>
                                )
                            }

                        </form>
                    </>
                ) : (
                    <>
                        <h1 className="font-bold text-[38px] text-[#333333] mb-[106px]">Письмо отправлено!</h1>
                        <img src={Santa} alt="Santa Claus" className="rounded-[20px]" />
                        <Link to="/login" className="text-[#FF6300] block leading-8 cursor-pointer mt-[16px] disabled:cursor-not-allowed"><span className="font-bold underline">Войти в аккаунт</span></Link>

                    </>
                )
            }

        </div>
    )
}

export default PasswordRecovery;