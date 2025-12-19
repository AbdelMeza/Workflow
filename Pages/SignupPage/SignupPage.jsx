import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import authentificationManagement from "../../Stores/Authentification"

export default function SignupPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [selectionStatus, setSelectionStatus] = useState(false)

    const { signup, errors, clearErrorsLog } = authentificationManagement()

    useEffect(()=>{
        clearErrorsLog()
    }, [])

    const handleSubmit = () => {
        const values = {
            username: username,
            email: email,
            password: password,
            role: role.toLowerCase(),
        }

        signup(values)
    }

    const verifyField = (selectedField) => {
        if (errors?.some(err => err.field === selectedField)) {
            return <span className="error-message">{errors.find(err => err.field === selectedField).errorMessage}</span>
        }
    }

    return <div className="signup-page bgc-lv1">
        <div className="home-button bgc-lv2 h-1 br brad-1" style={{ aspectRatio: 1, display: "flex", placeContent: "center", cursor: "pointer" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="st-c" width={20} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
        </div>
        <div className="content form-container bgc-lv2">
            <div className="form">
                <div className="form-header">
                    <img src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/WorkFlow%20assets/Icons/Worflow-icon.png" alt="workflow-icon" width={25} />
                    <span className="mt-c">WorkFlow</span>
                </div>
                <div className="form-content">
                    <div className="upper-content">
                        <div className="field-container">
                            <label htmlFor="username" className="st-c">Username</label>
                            <input type="text" className={`username-input h-2 br brad-1 ${verifyField("username") ? "error" : ""}`} value={username} onChange={(e) => setUsername(e.target.value)} />
                            {verifyField("username")}
                        </div>
                        <div className="field-container">
                            <label htmlFor="email" className="st-c">Email</label>
                            <input type="email" className={`email-input h-2 br brad-1 ${verifyField("email") ? "error" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                            {verifyField("email")}
                        </div>
                        <div className="field-container">
                            <label htmlFor="passowrd" className="st-c">Password</label>
                            <input type="password" className={`password-input h-2 br brad-1 ${verifyField("password") ? "error" : ""}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                            {verifyField("password")}
                        </div>
                        <div className="field-container">
                            <label htmlFor="repeat-passowrd" className="st-c">Select a role</label>
                            <div className={`role-selection h-2 br brad-1 ${verifyField("role") ? "error" : ""}`}>
                                <div className="role-selected" onClick={() => setSelectionStatus(!selectionStatus)}>
                                    {role}
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} className={`arrow-down ${selectionStatus ? "opened" : "closed"}`} style={{ opacity: 0.6 }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                <div className={`role-options br brad-1 ${selectionStatus ? "opened" : "closed"}`}>
                                    <div className="option" onClick={() => setRole("Freelancer")}>Freelancer</div>
                                    <div className="option" onClick={() => setRole("Client")}>Client</div>
                                </div>
                            </div>
                            {verifyField("role")}
                        </div>
                        <div className="switch-form-container">
                            <span className="st-c">Already have an account ? {""}
                                <span
                                    className="switch-button" style={{ textDecoration: "underline", cursor: "pointer" }}
                                    onClick={() => navigate('/login')}
                                >
                                    Log in
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="lower-content">
                        <button className="submit-button h-2 brad-1 btn-bgc lt-c" onClick={() => handleSubmit()}>Create account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}