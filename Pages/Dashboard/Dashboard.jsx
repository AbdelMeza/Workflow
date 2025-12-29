import './Dashboard.css'
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import tasksManagement from "../../Stores/tasksManagement"
import projectsManagement from "../../Stores/projectsManagement"
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader"
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar"

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