import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { VerifyAuth } from "../RoutesProtection/VerifyAuth"
import Lenis from "lenis"

const SignupPage = lazy(() => import("../Pages/SignupPage/SignupPage"))
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"))
const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"))
const Overview = lazy(() => import("../Pages/Dashboard/Overview/Overview"))

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    const cards = document.querySelectorAll(".service-container")

    const raf = (time) => {
      lenis.raf(time)

      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <Routes>
    <Route path="/signup" element={<SignupPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/" element={<VerifyAuth><HomePage /></VerifyAuth>}></Route>
    <Route path="/dashboard" element={<VerifyAuth><Dashboard /></VerifyAuth>} >
      <Route path="" element={
        <Suspense fallback={<div>Loading..</div>} >
          <Overview />
        </Suspense>
      }></Route>
      <Route path="projects" element={
        <Suspense fallback={<div>Loading..</div>} >
        </Suspense>
      }></Route>
    </Route>
  </Routes >
}

export default App
