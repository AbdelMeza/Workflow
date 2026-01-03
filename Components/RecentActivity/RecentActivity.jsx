import Container from "../Container/Container";

export default function RecentActivity() {
    return <Container headerTitle={"Recent activity"} title="activity">
        <code className="empty-data pad-3 st-c">No recent activity in sight</code>
    </Container>
}