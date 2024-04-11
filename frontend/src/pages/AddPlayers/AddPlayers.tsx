import Button from "@/components/ui/Button/Button";
import { Link } from "react-router-dom";


const AddPlayers = () => {

    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[132px] px-[190px] rounded-[20px] mx-auto mb-[5rem]">
            <h1 className="font-bold text-[38px] text-[#333333] mb-12">Добавить участников</h1>
            <div className="flex flex-col gap-[30px] w-[400px]">
                <Button className="text-[18px] px-[20px]">
                    <Link to="">
                        Создать свою карточку участника
                    </Link>
                </Button>
                <Button className="text-[18px] px-[20px]">
                    <Link to="">
                        Добавить участников вручную
                    </Link>
                </Button>
                <Button className="text-[18px] px-[20px]">
                    <Link to="">
                        Пригласить по ссылке
                    </Link>
                </Button>
            </div>

        </div>
    )
}

export default AddPlayers;