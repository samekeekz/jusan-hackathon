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
import MyGames from "./pages/MyGames/MyGames";
import SignOut from "./pages/SignOut/SignOut";
import AddPlayers from "./pages/AddPlayers/AddPlayers";
import GamePage from "./pages/GamePage/GamePage";
import Wishlist from "./pages/Wishlist/Wishlist";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const { isUserloggedIn } = useAuth();


  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="recoverPassword" element={<PasswordRecovery />} />
          <Route path="myaccount" element={<ProtectedRoute><MyCabinet /></ProtectedRoute>} />
          <Route path="createGame" element={<ProtectedRoute><CreateGame /></ProtectedRoute>} />
          <Route path="mygames" element={<ProtectedRoute><MyGames /></ProtectedRoute>} />
          <Route path="game/:id" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
          <Route path="game/:id/addPlayers" element={<ProtectedRoute><AddPlayers /></ProtectedRoute>} />
          <Route path="game/:id/wishlist" element={<ProtectedRoute returnBack={true}><Wishlist /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App;
