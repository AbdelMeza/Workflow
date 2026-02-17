import Lenis from "lenis"
import { socket } from "./socket"
import { Route, Routes } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react"
import InDevPage from "../Pages/InDevPage/InDevPage"
import RequireRole from "../RoutesProtection/requireRole"
import projectsManagement from "../Stores/projectsManagement"
import { RequireAuth } from "../RoutesProtection/requireAuth"
import LoadingPage from "../Components/LoadingPage/LoadingPage"
import activitesManagement from "../Stores/AcitiviesManagement"
import authentificationManagement from "../Stores/Authentification"
import DashboardRedirect from "../RoutesProtection/dashboardRedirect"

const SignupPage = lazy(() => import("../Pages/SignupPage/SignupPage"))
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"))
const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))

const DashboardLayout = lazy(() => import("../Pages/Dashboard/Dashboard"))
const Overview = lazy(() => import("../Pages/Dashboard/Overview/Overview"))
const Projects = lazy(() => import("../Pages/Dashboard/Projects/Projects"))

function App() {
  const { userData } = authentificationManagement()
  const { syncProjects } = projectsManagement()
  const { syncActivities } = activitesManagement()

  useEffect(() => {
    socket.on("projects:update", project => syncProjects(project))
    socket.on("activity:new", activity => syncActivities(activity))

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
      socket.off("project:clientAssigned")
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!userData?._id) return

    socket.connect()
    socket.emit("user:join", { userId: userData._id, username: userData.username })

    return () => {
      socket.disconnect()
    }
  }, [userData])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardRedirect />
          </RequireAuth>
        }
      >
      </Route>

      <Route
        path="/dashboard/freelancer"
        element={
          <RequireAuth>
            <RequireRole allowedRole={["freelancer"]}>
              <DashboardLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route path="*" element={<InDevPage />} />
        <Route
          index
          element={
            <Suspense fallback={<LoadingPage />}>
              <Overview />
            </Suspense>
          }
        />
        <Route
          path="projects"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Projects />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="/dashboard/client"
        element={
          <RequireAuth>
            <RequireRole allowedRole={["client"]} >
              <DashboardLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingPage />}>
              <Projects />
            </Suspense>
          }
        />
        <Route path="*" element={<InDevPage />} />
      </Route>

    </Routes>
  )
}

export default App
