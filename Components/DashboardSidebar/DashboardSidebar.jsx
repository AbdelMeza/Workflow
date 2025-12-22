import { useLocation, useNavigate } from 'react-router-dom'
import './DashboardSidebar.css'

export default function DashboardSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    const navigationLinks = [
        {
            icon: <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
            </>,
            content: "Overview",
            navigateTo: "/dashboard",
            active: path === "/dashboard" ? true : false
        }, {
            icon: <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            </>,
            content: "Projects",
            navigateTo: "/dashboard/projects",
            active: path === "/dashboard/projects" ? true : false
        }, {
            icon: <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
            </>,
            content: "Tasks",
            navigateTo: "/dashboard/tasks",
            active: path === "/dashboard/tasks" ? true : false
        }, {
            icon: <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            </>,
            content: "Clients",
            navigateTo: "/dashboard/clients",
            active: path === "/dashboard/clients" ? true : false
        }
    ]

    return <div className="dashboard-side-bar bgc-lv1">
        <div className="side-bar-header s-fs gap-1 pad-1">
            <img src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/assets/Icons/Workflow_icon.png" alt="workflow-icon" width={25} />
            <span className="mt-c">WorkFlow</span>
        </div>
        <div className="navigation-links-container gap-1">
            {navigationLinks.map((element, index) => (
                <div
                    className={`navigation-link mt-c s-fs h-2 brad-1 gap-2 ${element.active ? "active" : ""}`}
                    key={index}
                    onClick={() => navigate(`${element.navigateTo}`)}
                >
                    <span className="icon">{element.icon}</span>
                    <span className="content">{element.content}</span>
                </div>
            ))}
        </div>
    </div>
}
