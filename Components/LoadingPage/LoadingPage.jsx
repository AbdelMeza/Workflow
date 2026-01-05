import './LoadingPage.css'

export default function LoadingPage() {
    return <div className="loading-page flex-c">
        <div className="loading-text flex-c gap-1">
            <img
                src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/assets/Icons/Workflow_icon.png"
                alt="workflow-icon"
                width={25}
            />
            <span className="s-fs">Wait for loading..</span>
        </div>
    </div>
}