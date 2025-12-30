import projectsManagement from '../../Stores/projectsManagement'
import tasksManagement from '../../Stores/tasksManagement'
import './KeyPerfIndicator.css'

/**
 * KeyPerfIndicators Component
 *
 * This component displays a set of key performance indicators (KPIs)
 * for the dashboard (e.g. deadlines, projects, tasks, revenue).
 * Each KPI is represented as a card with an icon, a title, and a value.
 */
export default function KeyPerfIndicators({ data }) {
    return (
        <>
            {data.map((d, i) => (
                <div key={i} className={`key-performance-indicator ${d.alert && "alert"} bgc-lv3 brad-2 br flex flex-d-c`}>
                    {d.icon && (
                        <div className="icon-container">
                            <span className="icon">{d.icon}</span>
                        </div>
                    )}
                    <div className="data-title-container st-c s-fs">
                        <span className="data-title">{d.dataTitle}</span>
                    </div>
                    <div className="data-container mt-c m-fs">
                        <span className="data">{d.data}</span>
                    </div>
                </div>
            ))}
        </>
    )
}
