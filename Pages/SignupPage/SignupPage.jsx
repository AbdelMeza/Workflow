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
    }, [])

    /**
     * Handle form submission
     * Sends registration data to the authentication store
     * and redirects to home page if signup is successful.
     */
    const handleSubmit = async () => {
        const values = {
            username,
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
            {/* Back to home button */}
            <div
                className="home-button bgc-lv2 h-1 br brad-1"
                style={{
                    aspectRatio: 1,
                    display: "flex",
                    placeContent: "center",
                    cursor: "pointer"
                }}
                onClick={() => navigate('/')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="st-c"
                    width={20}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </div>

            {/* Signup form container */}
            <div className="content form-container bgc-lv2">
                <div className="form s-fs">

                    {/* Form header / branding */}
                    <div className="form-header flex-c gap-1">
                        <img
                            src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/assets/Icons/Workflow_icon.png"
                            alt="workflow-icon"
                            width={25}
                        />
                        <span className="mt-c">WorkFlow</span>
                    </div>

                    <div className="form-content">
                        <div className="upper-content">

                            {/* Username field */}
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

                            {/* Email field */}
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
                                    classGiven="btn-bgc brad-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
