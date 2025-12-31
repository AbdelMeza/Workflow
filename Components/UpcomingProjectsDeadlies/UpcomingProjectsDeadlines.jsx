import Container from "../Container/Container"
import Table from "../Table/Table"
import projectsManagement from "../../Stores/projectsManagement"
import { getTimeRemaining } from "../../utils/TimeRemaining/getTimeRemaining"

export default function UpcomingProjectsDeadlines() {
    const { pageData } = projectsManagement()
    const projects = pageData.projectsData.projectsList.lateProjects || []

    const upcomingProjects = projects
        .filter(project => project.deadline && project.status !== "completed" && getTimeRemaining(project.deadline))
        .slice(0, 3)

    const tableData = upcomingProjects.map(project => ({
        "Title": project.title,
        "Creator": project.freelancerId.username,
        "Time left": getTimeRemaining(project.deadline),
        "Status": project.status,
    }))

    if (!projects.length) return null

    return (
        <Container headerTitle={"Upcoming deadlines"} title="late-projects">
            <Table title={"upcoming-deadlines"} tableData={tableData} />
        </Container>
    )
}
