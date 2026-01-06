import { useState } from 'react'
import Button from '../Button/Button'
import './CreateProject.css'
import projectsManagement from '../../Stores/projectsManagement'
import useCases from '../../Stores/useCases'
import { useSearchParams } from 'react-router-dom'

export default function CreateProject() {
    const { projectFormIsOpen, openProjectForm } = useCases()
    const { createProject } = projectsManagement()
    const { getProjects } = projectsManagement()
    const [title, setTitle] = useState('')
    const [services, setServices] = useState('')
    const [client, setClient] = useState('')
    const [deadline, setDeadline] = useState('')
    const [budget, setBudget] = useState('')
    const [description, setDescription] = useState('')
    const [queryParams, setQueryParams] = useSearchParams()

    const isFormValid =
        title.trim() &&
        services.trim() &&
        client.trim() &&
        deadline &&
        budget &&
        description.trim()

    const handleSubmit = async () => {
        const projectData = {
            title,
            deadline: new Date(deadline),
            budget,
            description
        }

        if (isFormValid) {
            const fetchData = async () => {
                const page = parseInt(queryParams.get("page")) || 1
                const limit = parseInt(queryParams.get("limit")) || 5

                await getProjects({ page, limit })
            }

            await createProject(projectData)
            await fetchData()
            openProjectForm()
        }
    }

    return (
        <div className={`project-form ${projectFormIsOpen ? "opened" : "closed"}`}>
            <div className="close-btn bgc-lv3 h-1 br brad-1 flex-c" onClick={() => openProjectForm()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>

            <div className="form-container bgc-lv3 br brad-2 pad-2">
                <div className="inputs-container">
                    <label htmlFor="project-title">Project title</label>
                    <input
                        id="project-title"
                        type="text"
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="inputs-container">
                    <div className="inner-container">
                        <label htmlFor="project-services">Services</label>
                        <input
                            id="project-services"
                            type="text"
                            className="form-input"
                            value={services}
                            onChange={(e) => setServices(e.target.value)}
                        />
                    </div>

                    <div className="inner-container">
                        <label htmlFor="project-client">Search your client</label>
                        <input
                            id="project-client"
                            type="text"
                            className="form-input"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                        />
                    </div>
                </div>

                <div className="inputs-container">
                    <div className="inner-container">
                        <label htmlFor="project-deadline">Deadline</label>
                        <input
                            id="project-deadline"
                            type="date"
                            className="form-input"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    <div className="inner-container">
                        <label htmlFor="project-budget">Budget (€)</label>
                        <input
                            id="project-budget"
                            type="number"
                            step={50}
                            min={0}
                            className="form-input"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                    </div>
                </div>

                <div className="textarea-container">
                    <label htmlFor="project-description">Description</label>
                    <textarea
                        id="project-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="submit-btn-container">
                    <div className="submit-btn" onClick={() => handleSubmit()}>
                        <Button
                            content="Create project"
                            size="medium"
                            classGiven="submit-btn btn-bgc brad-1"
                            disabled={!isFormValid}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
