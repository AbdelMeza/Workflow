import Container from "../Container/Container"
import Table from "../Table/Table"
import projectsManagement from "../../Stores/projectsManagement"
import { getTimeRemaining } from "../../utils/TimeRemaining/getTimeRemaining"

export default function UpcomingProjectsDeadlines() {
    const { projects } = projectsManagement()
    const tableHeader = ["Title", "Creator", "Time remaining", "Status"]
    const tableData = projects
        .filter((project) => !project.deadline ||
            project.status === "completed" ||
            !getTimeRemaining(project.deadline) ? false : true)
        .slice(0, 3)
        .map((project) => ([
            project.title,
            project.freelancerId.username,
            getTimeRemaining(project.deadline),
            project.status,
        ]))

    return <>
        {projects && projects.length > 0 ?
            <Container headerTitle={"Upcoming deadlines"} title="late-projects">
                <Table title={"upcoming-deadlines"} header={tableHeader} data={tableData} />
            </Container>
            : <Container headerTitle={"Upcoming deadlines"}>
                <code className="empty-data s-fs st-c pad-3" style={{ display: "block", textAlign: "center" }}>No deadline, you're free!</code>
            </Container>
        }
    </>
}