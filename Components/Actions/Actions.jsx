import { useEffect, useRef, useState } from "react"
import useRole from "../../utils/useRole/useRole"
import "./Actions.css"
import projectsManagement from "../../Stores/projectsManagement"

export default function Actions({ position, setActionsStatus, projectId }) {
    const { deleteProject } = projectsManagement()
    const { isFreelancer, isClient } = useRole()
    const [pageSize, setPageSize] = useState()
    const actionsContainer = useRef(null)
    let content

    useEffect(() => {
        const element = actionsContainer.current

        if (element === null) return

        const positionTop = parseInt(position.y)
        const positionLeft = parseInt(position.x)

        element.style.left = `${positionLeft}%`
        element.style.top = `${positionTop}%`
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio < 1) {
                    element.style.top = "auto"
                    element.style.bottom = "5%"
                }
            })
        }, {
            threshold: [0, 1]
        })
    }, [position])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                actionsContainer.current &&
                !actionsContainer.current.contains(event.target) &&
                !event.target.classList.contains("action-btn")
            ) {
                setActionsStatus({ isVisible: false, position: { x: 0, y: 0 } })
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [setActionsStatus])

    isFreelancer ? content = [
        {
            title: "View project"
        }, {
            title: "Modifie project"
        }, {
            title: "Mark as completed"
        }, {
            title: "Delete project",
            action: function () {
                deleteProject(projectId)
                setActionsStatus({ isVisible: false, position: { x: 0, y: 0 } })
            },
            type: "delete",
        }
    ] : isClient ? content = [
        {
            title: "View project"
        }
    ] : null

    return <div className="actions-container bgc-lv3 br brad-2" ref={actionsContainer}>
        {content.map((c, i) => (
            <span
                className={`action-item s-fs st-c brad-1 ${c.type == "delete" ? "delete-btn" : "st-hover"}`}
                key={i}
                onClick={() => c.action()}
            >
                {c.title}
            </span>
        ))}
    </div>
}