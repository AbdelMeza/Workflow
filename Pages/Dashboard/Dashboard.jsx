import { Outlet } from "react-router-dom"
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader"
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar"
import './Dashboard.css'

export default function Dashboard() {
    return <div className="dashboard-page bgc-lv2">
        <DashboardSidebar />
        <div className="content flex flex-d-c pad-1 gap-2">
            <DashboardHeader />
            <Outlet />
        </div>
    </div>
}