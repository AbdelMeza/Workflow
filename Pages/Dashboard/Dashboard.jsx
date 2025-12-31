import './Dashboard.css'
import { useEffect } from "react"
import { Outlet, useSearchParams } from "react-router-dom"
import tasksManagement from "../../Stores/tasksManagement"
import projectsManagement from "../../Stores/projectsManagement"
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader"
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar"

export default function Dashboard() {
    const { getProjects } = projectsManagement()
    const { getTasks } = tasksManagement()
    const [queryParams, setQueryParams] = useSearchParams()

    const page = parseInt(queryParams.get("page")) || 1
    const limit = parseInt(queryParams.get("limit")) || 5

    useEffect(() => {
        const fetchData = async () => {
            await getProjects({ page, limit })
            await getTasks()
        }

        fetchData()
        document.title = "Workflow — Dashboard"
    }, [page, limit])

    return <div className="dashboard-page bgc-lv2">
        <DashboardSidebar />
        <div className="content flex flex-d-c pad-1 gap-2">
            <DashboardHeader />
            <Outlet />
        </div>
    </div>
}