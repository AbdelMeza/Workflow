import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const SignupPage = lazy(() => import("../Pages/SignupPage/SignupPage"))
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"))

function App() {
  return <Routes>
    <Route path="/signup" element={<SignupPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
  </Routes>
}

export default App
