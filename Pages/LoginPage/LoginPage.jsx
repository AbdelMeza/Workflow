import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const navigate = useNavigate()

    const error = {
        field: "",
        errorMessage: "",
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
                            <label htmlFor="username" className="st-c">Username or email</label>
                            <input type="text" className={`username-input h-2 br brad-1 ${error.field === "identifier" || error.field === "all" ? "error" : ""}`} />
                            {error && (error.field === "identifier" || error.field === "all") ? <span className="error-message">{error.errorMessage}</span> : null}
                        </div>
                        <div className="field-container">
                            <label htmlFor="passowrd" className="st-c">Password</label>
                            <input type="password" className={`password-input h-2 br brad-1 ${error.field === "password" || error.field === "all" ? "error" : ""}`} />
                            {error && error.field === "password" ? <span className="error-message">{error.errorMessage}</span> : null}
                        </div>
                        <div className="switch-form-container">
                            <span className="st-c">You don't have an account ? {""}
                                <span
                                    className="switch-button" style={{ textDecoration: "underline", cursor: "pointer" }}
                                    onClick={()=> navigate('/signup')}
                                >
                                    Sign up
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="lower-content">
                        <button className="submit-button h-2 brad-1 btn-bgc lt-c">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}