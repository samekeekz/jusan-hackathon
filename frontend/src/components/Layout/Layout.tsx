import { SnackbarProvider } from 'notistack'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <Outlet />
    )
}

export default Layout