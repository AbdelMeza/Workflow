import KeyPerfIndicators from "../../../Components/KPIs/KeyPerfIndicator"
import TasksDueDate from "../../../Components/TasksDuDate/TasksDueDate"
import UpcomingProjectsDeadlines from "../../../Components/UpcomingProjectsDeadlies/UpcomingProjectsDeadlines"

export default function Overview() {

    return <div className="overview flex flex-d-c gap-2">
        <div className="key-performance-indicators-container flex gap-1">
            <KeyPerfIndicators />
        </div>
        <div className="late-work-container flex gap-1">
            <UpcomingProjectsDeadlines />
            <TasksDueDate />
        </div>
    </div>
}