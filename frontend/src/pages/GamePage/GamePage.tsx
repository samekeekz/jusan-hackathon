import Santa from '@/assets/icons/messageSentSanta.svg';
import Button from '@/components/ui/Button/Button';
import { Link } from 'react-router-dom';

const GamePage = () => {
    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            <div className="flex flex-col items-center w-full">
                <h1 className="font-bold text-[38px] text-[#333333] mb-9">Игра создана!</h1>
                <img src={Santa} alt="Santa Claus" className="rounded-[20px] mb-7" />
                <div className='text-center mb-5'>
                    <h4 className='text-[20px] text-[#333333] font-bold'>Пока что никого нет</h4>
                    <p className='text-[15px] text-[#333333] leading-[34px] text-center'>Добавьте участников, чтоб игра началась</p>
                </div>
                <Button className='py-2'>
                    <Link to="/addPlayers" className="block leading-8 cursor-pointer disabled:cursor-not-allowed"><span className="font-bold">Добавить участников</span>
                    </Link>
                </Button>
            </div >
        </div>

    )
}

export default GamePage