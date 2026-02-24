import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import authentificationManagement from "../../Stores/Authentification"
import Button from "../../Components/Button/Button"

/**
 * SignupPage
 *
 * Registration page allowing users to create an account.
 * Users can register as either a Freelancer or a Client.
 * Handles form state, validation errors, and redirection.
 */
export default function SignupPage() {
    const navigate = useNavigate()

    // Form fields state
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    // Role dropdown UI state
    const [selectionStatus, setSelectionStatus] = useState(false)

    // Authentication store
    const { signup, errors, clearErrorsLog } = authentificationManagement()

    /**
     * Clear previous authentication errors
     * when the page is mounted.
     */
    useEffect(() => {
        clearErrorsLog()
        document.title = "Workflow — Signup"
    }, [])

    /**
     * Handle form submission
     * Sends registration data to the authentication store
     * and redirects to home page if signup is successful.
     */
    const handleSubmit = async () => {
        const values = {
            username: username.trim(),
            email,
            password,
            role: role.toLowerCase(),
        }

        const verify = await signup(values)
        if (verify) navigate("/")
    }

    /**
     * Display validation error message for a specific field
     * @param {string} selectedField - Field name to check
     */
    const verifyField = (selectedField) => {
        if (errors?.some(err => err.field === selectedField)) {
            return (
                <span className="error-message">
                    {errors.find(err => err.field === selectedField).errorMessage}
                </span>
            )
        }
    }

    return (
        <div className="signup-page bgc-lv1">
            {/* Signup form container */}
            <div className="content form-container bgc-lv2">
                <div className="header">
                    <div className="home-button bgc-lv2 h-1 br brad-1" onClick={() => navigate('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="st-c" width={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                </div>
                <div className="form s-fs">
                    <div className="form-content">
                        <div className="upper-content">
                            {/* Username & email fields */}
                            <div className="inputs-container flex gap-1">
                                <div className="field-container">
                                    <label htmlFor="username" className="st-c">Username</label>
                                    <input
                                        type="text"
                                        className={`username-input h-2 br brad-1 ${verifyField("username") ? "error" : ""
                                            }`}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {verifyField("username")}
                                </div>
                                <div className="field-container">
                                    <label htmlFor="email" className="st-c">Email</label>
                                    <input
                                        type="email"
                                        className={`email-input h-2 br brad-1 ${verifyField("email") ? "error" : ""
                                            }`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {verifyField("email")}
                                </div>
                            </div>
                            {/* Password field */}
                            <div className="field-container">
                                <label htmlFor="password" className="st-c">Password</label>
                                <input
                                    type="password"
                                    className={`password-input h-2 br brad-1 ${verifyField("password") ? "error" : ""
                                        }`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {verifyField("password")}
                            </div>

                            {/* Role selection */}
                            <div className="field-container">
                                <label htmlFor="role" className="st-c">Select a role</label>

                                <div className={`role-selection h-2 br brad-1 ${verifyField("role") ? "error" : ""
                                    }`}>
                                    {/* Selected role */}
                                    <div
                                        className="role-selected"
                                        onClick={() => setSelectionStatus(!selectionStatus)}
                                    >
                                        {role || "Choose a role"}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            className={`arrow-down ${selectionStatus ? "opened" : "closed"
                                                }`}
                                            style={{ opacity: 0.6 }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </div>

                                    {/* Role options */}
                                    <div
                                        className={`role-options br brad-1 ${selectionStatus ? "opened" : "closed"
                                            }`}
                                    >
                                        <div
                                            className="option"
                                            onClick={() => {
                                                setRole("Freelancer")
                                                setSelectionStatus(false)
                                            }}
                                        >
                                            Freelancer
                                        </div>
                                        <div
                                            className="option"
                                            onClick={() => {
                                                setRole("Client")
                                                setSelectionStatus(false)
                                            }}
                                        >
                                            Client
                                        </div>
                                    </div>
                                </div>

                                {verifyField("role")}
                            </div>

                            {/* Switch to login */}
                            <div className="switch-form-container">
                                <span className="st-c s-fs">
                                    Already have an account ?{" "}
                                    <span
                                        className="switch-button"
                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                        onClick={() => navigate('/login')}
                                    >
                                        Log in
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="lower-content">
                            <div onClick={handleSubmit}>
                                <Button
                                    content="Create account"
                                    size="medium"
                                    classGiven="submit-btn btn-bgc brad-1"
                                />
                            </div>
                        </div>
                        <span className="or-separator">
                            <span className="line"></span>
                            or
                            <span className="line"></span>
                        </span>
                        <button className="google-btn bgc-lv3 flex-c gap-2 brad-1 br h-2" onClick={() => handleLogin()}>
                            <svg width={20} viewBox="0 0 118 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Artboard-1" transform="translate(-332.000000, -639.000000)">
                                        <g id="google_buttn" transform="translate(332.000000, 639.000000)">
                                            <g id="logo_googleg_48dp">
                                                <path d="M117.6,61.3636364 C117.6,57.1090909 117.218182,53.0181818 116.509091,49.0909091 L60,49.0909091 L60,72.3 L92.2909091,72.3 C90.9,79.8 86.6727273,86.1545455 80.3181818,90.4090909 L80.3181818,105.463636 L99.7090909,105.463636 C111.054545,95.0181818 117.6,79.6363636 117.6,61.3636364 L117.6,61.3636364 Z" id="Shape" fill="#4285F4"></path>
                                                <path d="M60,120 C76.2,120 89.7818182,114.627273 99.7090909,105.463636 L80.3181818,90.4090909 C74.9454545,94.0090909 68.0727273,96.1363636 60,96.1363636 C44.3727273,96.1363636 31.1454545,85.5818182 26.4272727,71.4 L6.38181818,71.4 L6.38181818,86.9454545 C16.2545455,106.554545 36.5454545,120 60,120 L60,120 Z" id="Shape" fill="#34A853"></path>
                                                <path d="M26.4272727,71.4 C25.2272727,67.8 24.5454545,63.9545455 24.5454545,60 C24.5454545,56.0454545 25.2272727,52.2 26.4272727,48.6 L26.4272727,33.0545455 L6.38181818,33.0545455 C2.31818182,41.1545455 0,50.3181818 0,60 C0,69.6818182 2.31818182,78.8454545 6.38181818,86.9454545 L26.4272727,71.4 L26.4272727,71.4 Z" id="Shape" fill="#FBBC05"></path>
                                                <path d="M60,23.8636364 C68.8090909,23.8636364 76.7181818,26.8909091 82.9363636,32.8363636 L100.145455,15.6272727 C89.7545455,5.94545455 76.1727273,0 60,0 C36.5454545,0 16.2545455,13.4454545 6.38181818,33.0545455 L26.4272727,48.6 C31.1454545,34.4181818 44.3727273,23.8636364 60,23.8636364 L60,23.8636364 Z" id="Shape" fill="#EA4335"></path>
                                                <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="button-text s-fs">Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}