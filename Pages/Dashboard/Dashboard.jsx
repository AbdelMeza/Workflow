import { Outlet } from "react-router-dom"
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader"
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar"
import './Dashboard.css'
import { useEffect } from "react"
import projectsManagement from "../../Stores/projectsManagement"
import tasksManagement from "../../Stores/tasksManagement"

export default function Dashboard() {
    const { getProjects } = projectsManagement()
    const { getTasks } = tasksManagement()

    useEffect(() => {
        const fetchData = async () => {
            await getProjects()
            await getTasks()
        }

        fetchData()
    }, [])

    return <div className="dashboard-page bgc-lv2">
        <DashboardSidebar />
        <div className="content flex flex-d-c pad-1 gap-2">
            <DashboardHeader />
            <Outlet />
        </div>
    </div>
}