import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Registration/Register";
import Login from "./pages/Login/Login";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";
import MainPage from "./pages/MainPage/MainPage";
import MyCabinet from "./pages/MyCabinet/MyCabinet";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const { isUserloggedIn } = useContext(AuthContext);


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="recoverPassword" element={<PasswordRecovery />} />
        <Route path="myaccount" element={<MyCabinet />} />
      </Route>
    </Routes>
  )
}

export default App;
