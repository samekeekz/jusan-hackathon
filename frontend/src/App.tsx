import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Registration/Register";
import Login from "./pages/Login/Login";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

function ProtectedRoute({ element, ...props }) {
  const { isUserloggedIn } = useContext(AuthContext);

  return isUserloggedIn ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  const { isUserloggedIn } = useContext(AuthContext);


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="recoverPassword" element={<PasswordRecovery />} />
      </Route>
    </Routes>
  )
}

export default App;
