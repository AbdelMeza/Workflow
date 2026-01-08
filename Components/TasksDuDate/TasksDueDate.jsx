import Container from "../Container/Container"
import tasksManagement from "../../Stores/tasksManagement"
import './TaskDueDate.css'

export default function TasksDueDate() {
    const { tasks } = tasksManagement()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tasksForToday = tasks.filter(task => {
            if (!task.deadline || task.completed) return false

            const taskDate = new Date(task.deadline)
            taskDate.setHours(0, 0, 0, 0)

            return taskDate.getTime() === today.getTime()
        })
        .slice(0, 3)

    return (
        <Container headerTitle={"Tasks for today"} title="todays-tasks">
            {tasksForToday.length > 0 ? (
                tasksForToday.map((t, i) => (
                    <div className="task-item s-fs pad-1 flex gap-1" key={i}>
                        <div className="item-content">
                            <input type="checkbox" />
                        </div>
                        <div className="item-content flex flex-d-c gap-1">
                            <span className="task-title mt-c">{t.title}</span>
                            <span className="project-title st-c">
                                {t.projectId?.title}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <code
                    className="empty-data s-fs st-c pad-3"
                    style={{ display: "block", textAlign: "center" }}
                >
                    No tasks for today.
                </code>
            )}
        </Container>
    )
}
