import './ProjectsPage.css'
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Table from "../../../Components/Table/Table"
import useRole from "../../../utils/useRole/useRole"
import Button from "../../../Components/Button/Button"
import Status from "../../../Components/Status/Status"
import Actions from '../../../Components/Actions/Actions'
import formatData from "../../../utils/FormatData/formatData"
import Container from "../../../Components/Container/Container"
import projectsManagement from "../../../Stores/projectsManagement"
import KeyPerfIndicators from "../../../Components/KPIs/KeyPerfIndicator"
import CreateProject from "../../../Components/CreateProject/CreateProject"
import FilterContainer from '../../../Components/FilterContainer/FilterContainer'
import clientAffilationManagement from '../../../Stores/clientAffilationManagement'
import ClientAffiliation from "../../../Components/ClientAffiliation/ClientAffiliation"

export default function ProjectsPage() {
  const { isFreelancer, isClient } = useRole()
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [actionsStatus, setActionsStatus] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    projectId: null
  })
  const { toggleAffiliateClient } = clientAffilationManagement()
  const [selectedProject, setSelectedProject] = useState()
  const { projectsData, getProjects, getProjectStatus, projectStatus, loadingState, toggleProjectForm } = projectsManagement()
  const projects = projectsData.data.projectsList.projects
  const totalProjects = projectsData.data.totalProjects
  const totalLateProjects = projectsData.data.totalLateProjects
  const totalProjectsCompleted = projectsData.data.totalProjectsCompleted
  const estimatedRevenue = projectsData.data.estimatedRevenue
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get("page"))
  const limit = parseInt(searchParams.get("limit"))
  const filter = searchParams.get("filter") || "all"
  const totalPages = projectsData.pagination.totalPages

  const showActions = (event, projectId) => {
    const rect = event.target.getBoundingClientRect()

    const absoluteX = rect.left + window.scrollX
    const absoluteY = rect.top + window.scrollY

    const posX = (absoluteX / document.documentElement.scrollWidth) * 100
    const posY = (absoluteY / document.documentElement.scrollHeight) * 100

    setActionsStatus({
      isVisible: true,
      position: { x: posX, y: posY },
      projectId: projectId
    })
  }

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ filter: "all", page: 1, limit: 5, time: "newest" })
    }

    const fetchData = async () => {
      await getProjectStatus()
    }

    fetchData()

    window.addEventListener("resize", () => setActionsStatus({ isVisible: false }))
  }, [])

  useEffect(() => {
    if (page && totalPages && page > totalPages) {
      setSearchParams({ ...Object.fromEntries(searchParams), page: totalPages })
    }
  }, [searchParams.get("page")])

  const KPI_Data = [
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
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      dataTitle: "Estimated revenue",
      data: estimatedRevenue + "€",
    }
  ]

  const tableData = []
  if (isFreelancer) {
    projects.map(project => tableData.push({
      "Title": project.title,
      "Client": project.clientId ? project.clientId.username :
        <div
          className="affiliate-client-btn"
          onClick={() => {
            toggleAffiliateClient()
            setSelectedProject(project._id)
          }}
        >
          <Button content={"Add"} size="small" classGiven="bgc-lv3 br brad-1" />
        </div>,
      "Created at": new Date(project.createdAt).toLocaleDateString(),
      "Deadline": new Date(project.deadline).toLocaleDateString(),
      "Status": <Status content={project.status} />,
      "": <div className="action-btn" onClick={(e) => showActions(e, project._id)}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    }))
  }

  if (isClient) {
    projects.map(project => tableData.push({
      "Title": project.title,
      "Creator": project.freelancerId.username,
      "Created at": new Date(project.createdAt).toLocaleDateString(),
      "Deadline": new Date(project.deadline).toLocaleDateString(),
      "Status": <Status content={project.status} />
    }))
  }

  return (
    <div className="projects flex flex-d-c gap-3">
      {isFreelancer &&
        <>
          <CreateProject />
          <ClientAffiliation projectId={selectedProject} />
          <div className="header-container">
            <div className="side-content">
              <span className="page-title s-fs mt-c">Projects</span>
            </div>
            <div className="side-content flex" style={{ gap: "0.3vw" }}>
              <div className="open-project-form" onClick={() => toggleProjectForm()}>
                <Button
                  content={
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width={15} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Create project
                    </>
                  }
                  classGiven="bgc-lv3 br h-2 brad-2"
                />
              </div>
              <div onClick={() => setFilterIsOpen(!filterIsOpen)}>
                <Button
                  content={
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={15} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                      </svg>
                      Filter
                    </>
                  }
                  classGiven="bgc-lv3 br h-2 brad-2"
                />
              </div>
            </div>
          </div>
          <KeyPerfIndicators data={KPI_Data} />
          <FilterContainer entries={projectStatus} isOpen={filterIsOpen} setFilterIsOpen={setFilterIsOpen} />
        </>
      }
      {actionsStatus.isVisible &&
        <Actions
          position={{
            x: actionsStatus.position.x,
            y: actionsStatus.position.y
          }}
          setActionsStatus={setActionsStatus}
          projectId={actionsStatus.projectId}
        />
      }
      <div className="projects-container">
        <Container
          headerTitle={"All projects"}
          // Determine if pagination is needed based on total projects count and limit.
          hasPag={projectsData.data.totalProjects > limit}
          currentPage={parseInt(searchParams.get("page")) || 1}
          // Recalculate total pages dynamically based on totalProjects.
          // Ensures pagination stays in sync after realtime updates (socket events).
          totalPages={Math.ceil(projectsData.data.totalProjects / limit)}
          onPageChange={(newPage) => {
            setSearchParams(prev => ({
              ...Object.fromEntries(prev),
              page: newPage
            }))
          }}
        >
          {loadingState ? (
            <span className="Loading-message s-fs st-c pad-3">Wait for loading..</span>
          ) : tableData && tableData.length > 0 ? (
            <Table tableData={tableData} title={"projects"} />
          ) : isFreelancer ? (
            filter === "all" ? (
              <div className="create-project-container flex-c flex-d-c gap-2 pad-3">
                <span className="s-fs st-c">Create your first project</span>
                <div className="open-project-form" onClick={() => toggleProjectForm()}>
                  <Button
                    content={
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={15}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create project
                      </>
                    }
                    classGiven="bgc-lv3 br h-2 brad-2"
                  />
                </div>
              </div>
            ) : (
              <code className="empty-data s-fs st-c pad-3">
                No projects found with <b>{filter}</b> filter
              </code>
            )
          ) : isClient ? (
            <code className="empty-data s-fs st-c pad-3">No project for now</code>
          ) : null}
        </Container>
      </div>
    </div>
  )
}