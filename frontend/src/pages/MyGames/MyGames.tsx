import Button from "@/components/ui/Button/Button"
import gamesPagePicture from '../../assets/icons/gamesPagePicture.svg';
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { AuthClient } from "@/context/AuthProvider";
import { enqueueSnackbar } from "notistack";

export type Games = Game[]

export interface Game {
    name: string
    owner_email: string
    identificator: string
    isLimited: boolean
    price: number
    currencyType: string
    active: boolean
    playersNumber: number
}

type User = {
    email: string;
}

const MyGames = () => {
    const { isUserloggedIn } = useAuth();
    const [games, setGames] = useState<Games>([]);
    const [user, setUser] = useState<User>({ email: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthClient.get("/event");
                if (response.status === 200) {
                    setGames(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar("Что-то пошло не так", { variant: "error" });
            }
        };

        fetchData();
    }, [setGames]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuthClient.get("/users");
                console.log(response.data);
                setUser(response.data.email)
                console.log(user);

            } catch (error) {
                console.error("Error fetching data:", error);
                enqueueSnackbar("Ошибка при загрузке данных", { variant: "error" });
            }
        };

        fetchData();
    }, [user])



    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
            {!isUserloggedIn ? (
                <>
                    <Button className="font-normal text-[25px] px-[72px] py-4 min-w-[484px] mb-[41px]">Мои игры</Button>

                    <img src={gamesPagePicture} alt="Games page picture" className="mb-[19px]" />

                    <div className="text-center mb-[30px]">
                        <p className="mb-1 font-bold">Пока что Вы не участвуете в играх</p >
                        <p>Создайте или вступите в игру, чтоб принять участие</p>
                    </div>

                    <Button className="font-normal border-solid border-[3px] border-[#FF6300] bg-white text-[25px] text-[#FF6300] px-[42px] py-2 mb-[70px]">Создать игру</Button>
                </>
            ) : (
                <>
                    <Button className="font-normal text-[25px] px-[72px] py-4 min-w-[630px] mb-[54px]">Мои игры</Button>
                    {
                        games.length > 0 && (
                            <section className="flex flex-col gap-[34px]">
                                {games.map((game) => (
                                    <div key={game.identificator} className="min-w-[307px] h-[220px] border-solid border-[3px] rounded-[25px] border-[#C0E3E5]">
                                        <div className="px-[53px] p-[23px] text-center flex flex-col justify-between h-[100%]">
                                            <p className="text-[#FF6300] font-bold text-[25px]">{game.name}</p>
                                            <p className="text-[10px] text-[#979797] leading-5 font-bold">{game.owner_email === user.email ? 'Вы организатор' : ' Вы участник'} <br /> {game.owner_email} {user.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )
                    }
                </>
            )
            }
        </div>




    )
}

export default MyGames;