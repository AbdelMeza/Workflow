import Container from "../Container/Container"
import tasksManagement from "../../Stores/tasksManagement"

export default function TasksDueDate() {
    const { tasks, totalTasks } = tasksManagement()
    const tasksForToday = tasks.slice(0, 3)

    return <>
        {tasks && tasks.length > 0 ?
            <Container headerTitle={"Tasks for the day"} title="late-tasks">
                {tasksForToday.length > 0 ?
                    tasksForToday.map((t, i) => (
                        <div className="task-item s-fs pad-1 flex gap-1" key={i}>
                            <div className="item-content">
                                <input type="checkbox" />
                            </div>
                            <div className="item-content flex flex-d-c gap-1">
                                <span className="task-title mt-c">{t.title}</span>
                                <span className="project-title st-c">{t.projectId.title}</span>
                            </div>
                        </div>
                    ))
                    : <code className="empty-data s-fs st-c pad-3" style={{ display: "block", textAlign: "center" }}>No tasks for today!</code>
                }
            </Container>
            : <Container headerTitle={"Upcoming deadlines"}>
                <code className="empty-data s-fs st-c pad-3" style={{ display: "block", textAlign: "center" }}>No deadline, you're free!</code>
            </Container>
        }
    </>
}