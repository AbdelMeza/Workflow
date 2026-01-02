import Container from "../Container/Container"
import Table from "../Table/Table"
import projectsManagement from "../../Stores/projectsManagement"
import { getTimeRemaining } from "../../utils/TimeRemaining/getTimeRemaining"
import Button from "../Button/Button"

export default function UpcomingProjectsDeadlines() {
    const { pageData } = projectsManagement()
    const projects = pageData.projectsData.projectsList.lateProjects || []

    const upcomingProjects = projects

    const tableData = upcomingProjects.map(project => ({
        "Title": project.title,
        "Client": project.clientId ? project.clientId.username :
            <> <Button
                content={"Add"}
                size="small"
                classGiven="bgc-lv3 br brad-1"
            />
            </>,
        "Time left": getTimeRemaining(project.deadline),
        "Status": project.status,
    }))

    return (
        <Container headerTitle={"Upcoming deadlines"} title="late-projects">
            {tableData && tableData.length > 0 ?
                <Table title={"upcoming-deadlines"} tableData={tableData} /> :
                <code
                    className="empty-data s-fs st-c pad-3"
                    style={{ display: "block", textAlign: "center" }}
                >
                    No projects are behind schedule.
                </code>}
        </Container>
    )
}
