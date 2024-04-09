import { SnackbarProvider } from 'notistack'
import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'

const Layout = () => {
    return (
        <>
            <Header />
            <div>
                <section className="bg-white max-w-[850px] py-[52px] px-[90px] rounded-[20px] mx-auto mb-[5rem]">
                    <Outlet />
                </section>
            </div>
        </>
    )
}

export default Layout