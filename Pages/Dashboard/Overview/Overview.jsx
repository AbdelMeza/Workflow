import KeyPerfIndicators from "../../../Components/KPIs/KeyPerfIndicator"
import UpcomingDeadlines from "../../../utils/UpcomingDeadlies/UpcomingDeadlines"

export default function Overview() {

    return <div className="overview flex flex-d-c gap-2">
        <div className="key-performance-indicators-container flex gap-1">
            <KeyPerfIndicators />
        </div>
        <UpcomingDeadlines/>
    </div>
}