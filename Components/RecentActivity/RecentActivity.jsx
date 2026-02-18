import { useNavigate } from "react-router-dom";
import activitesManagement from "../../Stores/AcitiviesManagement";
import Container from "../Container/Container";
import Activity from "./Activity";
import './RecentActivity.css'

export default function RecentActivity() {
    const { activitiesData } = activitesManagement()
    const activities = activitiesData.data.activities || []
    console.log(activities)
    const navigate = useNavigate()

    return <Container
        headerTitle={
            <>
                <span>Recent activities</span>
                {activities.length >= 5 ? (
                    <span
                        className="st-c"
                        onClick={() => navigate('/dashboard/freelancer/activity')}
                        style={{ cursor: "pointer" }}
                    >
                        View all
                    </span>
                ): null}
            </>
        } title="activity"
    >
        {activities && activities.length > 0 ?
            <div className="activity-wrapper flex flex-d-c">
                {activities.map((activity, index) => (
                    <Activity type={activity.type} title={activity.title} details={activity.details} time={activity.createdAt} key={index} />
                ))}
            </div>
            : <code className="empty-data pad-3 st-c">No recent activity in sight</code>
        }
    </Container>
}