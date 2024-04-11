import Santa from '@/assets/icons/messageSentSanta.svg';
import Button from '@/components/ui/Button/Button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Game } from '../MyGames/MyGames';
import { AuthClient } from '@/context/AuthProvider';

const GamePage = () => {
    const [game, setGame] = useState<Game | null>(null);
    const location = useLocation();
    const { gameId } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthClient.get(`/event`, {
                    params: {
                        eventId: gameId
                    }
                });
                if (response.status === 200) {
                    setGame(response.data);
                    console.log(response.data);

                }

            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [gameId]);



    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            <div className="flex flex-col items-center w-full">
                <h1 className="font-bold text-[38px] text-[#333333] mb-9">Игра создана!</h1>
                <img src={Santa} alt="Santa Claus" className="rounded-[20px] mb-7" />
                {game ? (
                    <div className='text-center mb-5'>
                        <h4 className='text-[20px] text-[#333333] font-bold'>{game.name}</h4>
                        <p className='text-[15px] text-[#333333] leading-[34px] text-center'>Автор: {game.owner_email}</p>
                    </div>
                ) : (
                    <div className='text-center mb-5'>
                        <h4 className='text-[20px] text-[#333333] font-bold'>Пока что никого нет</h4>
                        <p className='text-[15px] text-[#333333] leading-[34px] text-center'>Добавьте участников, чтоб игра началась</p>
                    </div>
                )}
                <Button className='py-2'>
                    <Link to={`/game/${gameId}/addPlayers`} className="block leading-8 cursor-pointer disabled:cursor-not-allowed"><span className="font-bold">Добавить участников</span>
                    </Link>
                </Button>
            </div >
        </div>

    )
}

export default GamePage