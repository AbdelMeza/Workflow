import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Lenis from "lenis"
import { RequireAuth } from "../RoutesProtection/requireAuth"
import InDevPage from "../Pages/InDevPage/InDevPage"

const SignupPage = lazy(() => import("../Pages/SignupPage/SignupPage"))
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"))
const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"))
const Overview = lazy(() => import("../Pages/Dashboard/Overview/Overview"))
const Projects = lazy(() => import("../Pages/Dashboard/Projects/Projects"))

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

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
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} >
      <Route path="*" element={<InDevPage />}></Route>
      <Route path="" element={
        <Suspense fallback={<div>Loading..</div>} >
          <Overview />
        </Suspense>
      }></Route>
      <Route path="projects" element={
        <Suspense fallback={<div>Loading..</div>} >
          <Projects />
        </Suspense>
      }></Route>
    </Route>
  </Routes >
}

export default App
