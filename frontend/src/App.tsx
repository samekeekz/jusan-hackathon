import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./components/Authorization/Login/Login"
import Register from "./components/Authorization/Registration/Register"
import { useContext } from "react"
import { AuthContext } from "./context/AuthProvider"
import PasswordRecovery from "./components/Authorization/PasswordRecovery/PasswordRecovery"

function App() {
  const { isUserloggedIn } = useContext(AuthContext);


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="recoveryPassword" element={<PasswordRecovery />} />
      </Route>
    </Routes>
  )
}

export default App;
