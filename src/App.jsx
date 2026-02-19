import Lenis from "lenis"
import { socket } from "./socket"
import { lazy, Suspense, useEffect } from "react"
import InDevPage from "../Pages/InDevPage/InDevPage"
import RequireRole from "../RoutesProtection/requireRole"
import projectsManagement from "../Stores/projectsManagement"
import { RequireAuth } from "../RoutesProtection/requireAuth"
import LoadingPage from "../Components/LoadingPage/LoadingPage"
import activitesManagement from "../Stores/AcitiviesManagement"
import { Route, Routes, useSearchParams } from "react-router-dom"
import authentificationManagement from "../Stores/Authentification"
import DashboardRedirect from "../RoutesProtection/dashboardRedirect"

const SignupPage = lazy(() => import("../Pages/SignupPage/SignupPage"))
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"))
const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))

const DashboardLayout = lazy(() => import("../Pages/Dashboard/Dashboard"))
const OverviewPage = lazy(() => import("../Pages/Dashboard/OverviewPage/OverviewPage.jsx"))
const ProjectsPage = lazy(() => import("../Pages/Dashboard/ProjectsPage/ProjectsPage.jsx"))
const ActivityPage = lazy(() => import("../Pages/Dashboard/ActivityPage/ActivityPage.jsx"))

function App() {
  const { userData } = authentificationManagement()
  const { syncProjects, getProjects } = projectsManagement()
  const { syncActivities } = activitesManagement()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get("page"))
  const limit = parseInt(searchParams.get("limit"))

  useEffect(() => {
    if (syncProjects !== null && syncProjects !== undefined) {
      socket.on("projects:update", ({ action, project }) => {
        const result = syncProjects({ action, project, currentPage, limit })

        if (result?.refetchPreviousPage) {
          const newPage = currentPage - 1
          setSearchParams({ ...Object.fromEntries(searchParams), page: newPage, limit })
          getProjects({ page: newPage, limit })
        }

        if (result?.refetchCurrentPage) {
          getProjects({ page: currentPage, limit })
        }
      })
    }

  }, [syncProjects])

  useEffect(() => {
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
      socket.off()
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!userData?._id) return

    socket.connect()
    socket.emit("user:join", { userId: userData._id })

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
              <OverviewPage />
            </Suspense>
          }
        />
        <Route
          path="projects"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="activity"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ActivityPage />
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
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<InDevPage />} />
      </Route>

    </Routes>
  )
}

export default App
