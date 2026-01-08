import Container from "../Container/Container"
import Table from "../Table/Table"
import projectsManagement from "../../Stores/projectsManagement"
import { getTimeRemaining } from "../../utils/TimeRemaining/getTimeRemaining"
import Button from "../Button/Button"
import Status from "../Status/Status"
import { useNavigate } from "react-router-dom"
import useCases from "../../Stores/useCases"
import { useState } from "react"

export default function UpcomingProjectsDeadlines({ setSelectedProject }) {
    const navigate = useNavigate()
    const { pageData } = projectsManagement()
    const { toggleAffiliateClient } = useCases()
    const upcomingProjects = pageData.projectsData.projectsList.lateProjects || []

    const tableData = upcomingProjects.map(project => ({
        "Title": project.title,
        "Client": project.clientId ? project.clientId.username :
            <>
                <div
                    className="affiliate-client-btn"
                    onClick={() => {
                        toggleAffiliateClient()
                        setSelectedProject(project._id)
                    }}
                >
                    <Button
                        content={"Add"}
                        size="small"
                        classGiven="bgc-lv3 br brad-1"
                    />
                </div>
            </>,
        "Time left": getTimeRemaining(project.deadline),
        "Status": <Status content={project.status} />,
    })).slice(0, 3)

    return (
        <Container
            headerTitle={
                <>
                    <span>Upcoming deadlines</span>
                    <span
                        className="st-c"
                        onClick={() => navigate('/dashboard/projects')}
                        style={{ cursor: "pointer" }}
                    >
                        View all
                    </span>
                </>
            }
            title="late-projects"
        >
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
