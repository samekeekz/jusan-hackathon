import { Outlet } from 'react-router-dom'
import Header from '../Header/Header.tsx'

const Layout = () => {
    return (
        <>
            <Header />
            <div className='px-5'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout