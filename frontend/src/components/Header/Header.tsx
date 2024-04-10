import envelope from '../../assets/icons/envelope.svg';
import { Link } from 'react-router-dom'
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function Header() {
  const { isUserloggedIn } = useAuth();

  useEffect(() => {
    console.log("isUserloggedIn", isUserloggedIn)
  }, [isUserloggedIn])

  return (
    <header className="h-[5rem] bg-[#ffff] relative mb-[7.5rem]">
      <div className="flex h-full max-w-[83rem] justify-between mx-auto items-center relative">
        <Link to="/">
          <img src={envelope} alt="envelope" />
        </Link>
        <nav className='text-[#FF6300] font-bold'>
          <ul className='flex'>
            {
              !isUserloggedIn ? (
                <>
                  <li className='pr-[1.4375rem]'>
                    <Link to='/signup'>Регистрация</Link>
                  </li>
                  <li className='pl-[1.4375rem] border-l-2 border-[#FF6300]'>
                    <Link to='/login'>Вход</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='pr-[1.4375rem]'>
                    <Link to='/signup'>Мои Игры</Link>
                  </li>
                  <li className='pl-[1.4375rem]'>
                    <Link to='/login'>Уведомления</Link>
                  </li>
                  <li className='pl-[1.4375rem] border-[#FF6300]'>
                    <Link to='/myaccount'>Мой аккаунт</Link>
                  </li>
                </>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  );
}
