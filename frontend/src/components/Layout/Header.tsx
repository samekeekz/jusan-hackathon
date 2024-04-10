import envelope from '../../assets/icons/envelope.svg';
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="h-[5rem] bg-[#ffff] relative mb-[7.5rem]">
      <div className="flex h-full max-w-[83rem] justify-between mx-auto items-center relative">
        <img src={envelope} alt="envelope" />
        <nav className='text-[#FF6300] font-bold'>
          <ul className='flex'>
            <li className='pr-[1.4375rem]'>
              <Link to='/signup'>Регистрация</Link>
            </li>
            <li className='pl-[1.4375rem] border-l-2 border-[#FF6300]'>
              <Link to='/login'>Вход</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
