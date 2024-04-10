import Santa from "@/assets/icons/Rectangle 586.svg"
import Button from "@/components/ui/Button/Button"
import { Link } from "react-router-dom"
const MainPage = () => {
    return (
        <div className="flex h-full max-w-[83rem] justify-between mx-auto items-center">
            <div className="flex flex-col gap-[120px]">
                <div>
                    <h1 className="text-[#333333] text-[75px] font-bold leading-[97px]">Тайный Санта</h1>
                    <p className="text-[#333333] text-[30px] leading-[34px]">Организуй тайный обмен подарками между друзьями или коллегами</p>
                </div>
                <div className="flex gap-10 items-center">
                    <Button className="px-9 py-[6px] text-[22px] text-[#F3F4F6] leading-9">
                        <Link to="/signup">Создать игру</Link>
                    </Button>
                    <Button className="bg-white border-[1px] border-solid font-normal px-9 py-[6px] text-[22px] leading-9 text-[#333333] border-[#FF6300]">
                        <Link to="/signup">Жеребьевка</Link>
                    </Button>
                </div>
            </div>
            <div>
                <img src={Santa} alt="Welcoming Santa" />
            </div>
        </div>
    )
}

export default MainPage