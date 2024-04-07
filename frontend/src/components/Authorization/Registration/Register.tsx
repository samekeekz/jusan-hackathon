import Button from "../../ui/Button/Button"
import Input from "../../ui/Input/Input"
const Register = () => {

  return (
    <div className="bg-white flex flex-col items-center w-[850px] h-[760px] py-[52px] px-[90px]">
      <h1 className="font-bold text-[38px] text-[#333333] mb-12">Регистрация</h1>
      <form>
        <Input id="name" label="Ваше Имя" />
        <label htmlFor="email" className="ml-[2px] text-[#333333] text-2xl text-left self-start">Ваш E-mail</label>
        <input type="text" id="email" className="w-full border-[#C0E3E5] solid border-[2.8px] rounded-[20px] px-7 py-3 text-[#979797] text-2xl mb-10" />
        <Button className="mb-[10px]">Зарегистрироваться</Button>
      </form>
      <p className="text-[14px] text-[#979797] leading-8">Уже есть аккаунт? <span className="font-bold capitalize underline">Войти</span></p>
    </div>
  )
}

export default Register