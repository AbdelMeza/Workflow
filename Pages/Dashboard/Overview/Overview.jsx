import { useSearchParams } from "react-router-dom"
import KeyPerfIndicators from "../../../Components/KPIs/KeyPerfIndicator"
import RecentActivity from "../../../Components/RecentActivity/RecentActivity"
import TasksDueDate from "../../../Components/TasksDuDate/TasksDueDate"
import UpcomingProjectsDeadlines from "../../../Components/UpcomingProjectsDeadlies/UpcomingProjectsDeadlines"
import projectsManagement from "../../../Stores/projectsManagement"
import tasksManagement from "../../../Stores/tasksManagement"
import './Overview.css'
import formatData from "../../../utils/FormatData/formatData"

export default function Overview() {

    const { pageData } = projectsManagement()
    const { totalTasks } = tasksManagement()
    const projects = pageData.projectsData.projectsList.projects
    const totalProjects = pageData.projectsData.totalProjects
    const totalLateProjects = pageData.projectsData.totalLateProjects

    const data = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            ),
            dataTitle: "Upcoming deadlines",
            data: formatData(totalLateProjects),
            alert: totalLateProjects > 0 ? true : false
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
            ),
            dataTitle: "Total projects",
            data: formatData(totalProjects),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
            dataTitle: "Projects completed",
            data: formatData(projects.filter(el => el.status === "completed").length),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
            ),
            dataTitle: "Total tasks",
            data: formatData(totalTasks)
        }
    ]

    return <div className="overview flex flex-d-c gap-2">
        <div className="key-performance-indicators-container flex gap-1">
            <KeyPerfIndicators data={data} />
        </div>
        <div className="late-work-container flex gap-1">
            <UpcomingProjectsDeadlines />
            <TasksDueDate />
        </div>
        <div className="activity-container">
            <RecentActivity />
        </div>
    </div>
}