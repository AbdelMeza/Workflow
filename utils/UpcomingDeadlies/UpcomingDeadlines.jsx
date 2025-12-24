import Container from "../../Components/Container/Container"
import Table from "../../Components/Table/Table"
import projectsManagement from "../../Stores/projectsManagement"

export default function UpcomingDeadlines() {
    const { lateProjects } = projectsManagement()
    const tableHeader = ["Title", "Creator", "Deadline", "Status"]
    const tableData = lateProjects.map((project) => ([
        project.title,
        project.freelancerId.username,
        new Date(project.deadline).toLocaleDateString(),
        project.status,
    ]))

    return <>
        {lateProjects && lateProjects.length > 0 ?
            <Container headerTitle={"Upcoming deadlines"}>
                <Table title={"upcoming-deadlines"} header={tableHeader} data={tableData} />
            </Container>
            : <Container headerTitle={"Upcoming deadlines"}>
                <code className="empty-data s-fs st-c pad-3" style={{ display: "block", textAlign: "center" }}>No deadline, you're free!</code>
            </Container>
        }
    </>
}