import './Dashboard.css'
import { useEffect } from "react"
import useRole from '../../utils/useRole/useRole'
import tasksManagement from "../../Stores/tasksManagement"
import { Outlet, useSearchParams } from "react-router-dom"
import projectsManagement from "../../Stores/projectsManagement"
import activitesManagement from '../../Stores/AcitiviesManagement'
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader"
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar"

export default function Dashboard() {
    const { getProjects } = projectsManagement()
    const { getActivities } = activitesManagement()
    const [queryParams, setQueryParams] = useSearchParams()

    const filter = queryParams.get("filter") || "all"
    const page = parseInt(queryParams.get("page")) || 1
    const limit = parseInt(queryParams.get("limit")) || 5

    useEffect(() => {
        document.title = "Workflow — Dashboard"
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await getActivities({ page, limit, filter })
        }

        fetchData()
    }, [page, limit, filter])

    useEffect(() => {
        const fetchData = async () => {
            await getProjects({ page, limit })
        }

        fetchData()
    }, [page, limit])

    return <div className="dashboard-page bgc-lv2">
        <DashboardSidebar />
        <div className="content flex flex-d-c pad-1 gap-2">
            <DashboardHeader />
            <Outlet />
        </div>
    </div>
}