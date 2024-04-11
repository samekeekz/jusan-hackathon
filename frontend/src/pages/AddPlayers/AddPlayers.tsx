import Button from "@/components/ui/Button/Button";


const AddPlayers = () => {

    return (
        <div className="flex flex-col items-center bg-white max-w-[850px] py-[132px] px-[190px] rounded-[20px] mx-auto mb-[5rem]">
            <h1 className="font-bold text-[38px] text-[#333333] mb-12">Добавить участников</h1>
            <div className="flex flex-col gap-[30px] w-[400px]">
                <Button className="text-[18px] px-[20px]">Создать свою карточку участника</Button>
                <Button className="text-[18px] px-[20px]">Добавить участников вручную</Button>
                <Button className="text-[18px] px-[20px]">Пригласить по ссылке</Button>
            </div>

        </div>
    )
}

export default AddPlayers;