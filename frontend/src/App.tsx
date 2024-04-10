import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Registration/Register";
import Login from "./pages/Login/Login";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import MainPage from "./pages/MainPage/MainPage";
import MyCabinet from "./pages/MyCabinet/MyCabinet";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary";
import useAuth from "./hooks/useAuth";
import CreateGame from "./pages/CreateGame/CreateGame";

function App() {
  const { isUserloggedIn } = useAuth();


  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="recoverPassword" element={<PasswordRecovery />} />
          <Route path="myaccount" element={<MyCabinet />} />
          <Route path="createGame" element={<CreateGame />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App;
