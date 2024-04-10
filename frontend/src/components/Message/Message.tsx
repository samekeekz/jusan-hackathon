import React from 'react';
import Santa from '@/assets/icons/messageSentSanta.svg';
import { Link } from 'react-router-dom';
import Button from '../ui/Button/Button';

type MessageProps = {
    type: "invitations" | "passwordRecovery" | "playerAdded"
}

const Message: React.FC<MessageProps> = ({ type }) => {
    const getMessageContent = () => {
        switch (type) {
            case "invitations":
                return {
                    title: "Приглашения отправлены",
                    label: "Вам придет уведомление, как только участники примут Ваше приглашение",
                    linkText: "На главную"
                };
            case "passwordRecovery":
                return {
                    title: "Письмо отправлено!",
                    linkText: "Войти в аккаунт"
                };
            case "playerAdded":
                return {
                    title: "Карточка участника создана!",
                    label: "Вам придет уведомление, как только Организатор проведет жеребьевку",
                    linkText: "На главную"
                };
            default:
                return {
                    title: "",
                    label: "",
                    linkText: ""
                };
        }
    };

    const { title, label, linkText } = getMessageContent();

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="font-bold text-[38px] text-[#333333] mb-9">{title}</h1>
            <img src={Santa} alt="Santa Claus" className="rounded-[20px] mb-7" />
            <p className='text-[15px] text-[#333333] leading-[34px] text-center mb-8'>{label}</p>
            <Button>
                <Link to="/" className="block leading-8 cursor-pointer disabled:cursor-not-allowed"><span className="font-bold">{linkText}</span>
                </Link>
            </Button>
        </div >
    );
};

export default Message;
