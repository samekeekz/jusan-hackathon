import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./components/Authorization/Login/Login"
import Register from "./components/Authorization/Registration/Register"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App;
