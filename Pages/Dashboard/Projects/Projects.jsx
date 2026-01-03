import { useEffect } from "react"
import Button from "../../../Components/Button/Button"
import Container from "../../../Components/Container/Container"
import KeyPerfIndicators from "../../../Components/KPIs/KeyPerfIndicator"
import Table from "../../../Components/Table/Table"
import projectsManagement from "../../../Stores/projectsManagement"
import { useSearchParams } from "react-router-dom"
import './Projects.css'
import formatData from "../../../utils/FormatData/formatData"
import CreateProject from "../../../Components/CreateProject/CreateProject"
import useCases from "../../../Stores/useCases"
import Status from "../../../Components/Status/Status"

export default function Projects() {
    const { pageData, getProjects } = projectsManagement()
    const { openProjectForm } = useCases()
    const projects = pageData.projectsData.projectsList.projects
    const totalProjects = pageData.projectsData.totalProjects
    const totalLateProjects = pageData.projectsData.totalLateProjects
    const totalProjectsCompleted = pageData.projectsData.totalProjectsCompleted

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: 1, limit: 5 })
        }
    }, [])

    const data = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            ),
            dataTitle: "Upcoming deadlines",
            data: formatData(totalLateProjects),
            alert: totalLateProjects > 0 ? true : false
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
            ),
            dataTitle: "Total projects",
            data: formatData(totalProjects),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
            dataTitle: "Projects completed",
            data: formatData(totalProjectsCompleted),
        }
    ]

    const tableData = []
    projects.map(project => tableData.push({
        "Title": project.title,
        "Client": project.clientId ? project.clientId.username :
            <> <Button
                content={"Add"}
                size="small"
                classGiven="bgc-lv3 br brad-1"
            />
            </>,
        "Deadline": new Date(project.deadline).toLocaleDateString(),
        "Status": <Status content={project.status} />,
    })
    )

    return <div className="projects flex flex-d-c gap-2">
        <CreateProject />
        <div className="header-container">
            <div className="side-content">
                <span className="page-title s-fs mt-c">Projects</span>
            </div>
            <div className="side-content">
                <div className="open-project-form" onClick={() => openProjectForm()}>
                    <Button
                        content={
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width={15} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Create project
                            </>
                        }
                        size="medium"
                        classGiven="bgc-lv3 br brad-2"
                    />
                </div>
            </div>
        </div>
        <KeyPerfIndicators data={data} />
        <div className="projects-container">
            <Container
                headerTitle={"All projects"}
                hasPag={true}
                currentPage={parseInt(searchParams.get("page")) || 1}
                totalPages={pageData.pagination.totalPages || 1}
                onPageChange={(newPage) => {
                    setSearchParams({ page: newPage, limit: parseInt(searchParams.get("limit")) })
                    getProjects({ page: newPage, limit: parseInt(searchParams.get("limit")) })
                }}
            >
                {tableData && tableData.length > 0 ?
                    <Table tableData={tableData} title={"projects"} /> :
                    <div className="create-project-container flex-c flex-d-c gap-1 pad-3">
                        <span className="m-fs mt-c">Oops..no project found</span>
                        <span className="s-fs st-c" style={{ marginBottom: "1.5vw" }}>Create your first project</span>
                        <div className="open-project-form" onClick={() => openProjectForm()}>
                            <Button
                                content={
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={15} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Create project
                                    </>
                                }
                                size="medium"
                                classGiven="bgc-lv3 br brad-1"
                            />
                        </div>
                    </div>
                }
            </Container>

        </div>
    </div>
}