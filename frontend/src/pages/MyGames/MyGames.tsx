import Button from "@/components/ui/Button/Button"
import gamesPagePicture from '../../assets/icons/gamesPagePicture.svg';

interface MyGamesProps {
    isloggedIn: boolean;
}

const MyGames: React.FC<MyGamesProps> = ({isloggedIn}) => {

    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            {isloggedIn ? (
                <>
                    <Button className="font-normal text-[25px] px-[72px] py-4 min-w-[484px] mb-[41px]">Мои игры</Button>

                    <img src={gamesPagePicture} alt="Games page picture" className="mb-[19px]"/>

                    <div className="text-center mb-[30px]">
                        <p className="mb-1 font-bold">Пока что Вы не участвуете в играх</p >
                        <p>Создайте или вступите в игру, чтоб принять участие</p>
                    </div>

                    <Button className="font-normal border-solid border-[3px] border-[#FF6300] bg-white text-[25px] text-[#FF6300] px-[42px] py-2 mb-[70px]">Создать игру</Button>
                </>
            ) : (
                <>
                <Button className="font-normal text-[25px] px-[72px] py-4 min-w-[630px] mb-[54px]">Мои игры</Button>

                    <section className="flex flex-col gap-[34px]">
                        <div className="upper-row flex justify-between gap-5">
                            <div className="min-w-[307px] h-[220px] border-solid border-[3px] rounded-[25px] border-[#C0E3E5]">
                                <div className="px-[53px] p-[23px] text-center flex flex-col justify-between h-[100%]">
                                    <p className="text-[#FF6300] font-bold text-[25px]">Название игры</p>
                                    <p className="text-[10px] text-[#979797] leading-5 font-bold">Вы участник <br /> *количество участников*</p>
                                </div>
                            </div>
                            <div className="min-w-[307px] h-[220px] border-solid border-[3px] rounded-[25px] border-[#C0E3E5]">
                                <div className="px-[53px] p-[23px] text-center flex flex-col justify-between h-[100%]">
                                    <p className="text-[#FF6300] font-bold text-[25px]">Название игры</p>
                                    <p className="text-[10px] text-[#979797] leading-5 font-bold">Вы участник <br /> *количество участников*</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lower-row flex justify-between gap-5">
                            <div className="min-w-[307px] h-[220px] border-solid border-[3px] rounded-[25px] border-[#C0E3E5]">
                                <div className="px-[53px] p-[23px] text-center flex flex-col justify-between h-[100%]">
                                    <p className="text-[#FF6300] font-bold text-[25px]">Название игры</p>
                                    <p className="text-[10px] text-[#979797] leading-5 font-bold">Вы участник <br /> *количество участников*</p>
                                </div>
                            </div>
                            <div className="min-w-[307px] h-[220px] border-solid border-[3px] rounded-[25px] border-[#C0E3E5]">
                                <div className="px-[53px] p-[23px] text-center flex flex-col justify-between h-[100%]">
                                    <p className="text-[#FF6300] font-bold text-[25px]">Название игры</p>
                                    <p className="text-[10px] text-[#979797] leading-5 font-bold">Вы участник <br /> *количество участников*</p>
                                </div>
                            </div>
                        </div>
                        
                    </section>

                    
                </>
            )
            }
        </div>    
           
            

            
    )   
}

export default MyGames;