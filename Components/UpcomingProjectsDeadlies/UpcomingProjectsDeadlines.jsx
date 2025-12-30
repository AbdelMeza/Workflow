import Container from "../Container/Container"
import Table from "../Table/Table"
import projectsManagement from "../../Stores/projectsManagement"
import { getTimeRemaining } from "../../utils/TimeRemaining/getTimeRemaining"

export default function UpcomingProjectsDeadlines() {
    const { projects } = projectsManagement()
    const tableData = []
    projects.filter((project) => !project.deadline ||
        project.status === "completed" ||
        !getTimeRemaining(project.deadline) ? false : true)
        .slice(0, 3)
        .map(project => tableData.push({
            "Title": project.title,
            "Creator": project.freelancerId.username,
            "Time left": getTimeRemaining(project.deadline),
            "Status": project.status,
        })
        )

    return <>
        {projects && projects.length > 0 &&
            <Container headerTitle={"Upcoming deadlines"} title="late-projects">
                <Table title={"upcoming-deadlines"} tableData={tableData} />
            </Container>
        }
    </>
}