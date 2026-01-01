export default function CreateProject(){
    return <div className="project-form">
        <div className="inputs-container">
            <label htmlFor="project-title">Project title</label>
            <input type="text" className="form-input"/>
        </div>
        <div className="inputs-container">
            <label htmlFor="project-title">Affiliate your client</label>
            <input type="text" className="form-input"/>
        </div>
    </div>
}