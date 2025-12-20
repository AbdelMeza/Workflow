import { lazy, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import authentificationManagement from "../Stores/Authentification"
import { VerifyAuth } from "../RoutesProtection/VerifyAuth"

const SignupPage = lazy(() => import("../Pages/SignupPage/SignupPage"))
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"))
const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))

function App() {
  return <Routes>
    <Route path="/signup" element={<SignupPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/" element={<HomePage />}></Route>
  </Routes >
}

export default App
