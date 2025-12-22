import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from "../../Components/Button/Button"
import authentificationManagement from "../../Stores/Authentification"

/**
 * LoginPage
 *
 * Authentication page allowing users to log in
 * using either their username or email and password.
 * Handles form state, validation errors, and redirection.
 */
export default function LoginPage() {
    const navigate = useNavigate()

    // Form fields state
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")

    // Authentication store
    const { login, errors, clearErrorsLog } = authentificationManagement()

    /**
     * Clear previous authentication errors
     * when the page is mounted.
     */
    useEffect(() => {
        clearErrorsLog()
    }, [])

    /**
     * Handle form submission
     * Sends credentials to the authentication store
     * and redirects to home page if login is successful.
     */
    const handleSubmit = async () => {
        const values = {
            identifier,
            password,
        }

        const verify = await login(values)
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

            {/* Login form container */}
            <div className="content form-container bgc-lv2">
                <div className="form s-fs">

                    {/* Form header / branding */}
                    <div className="form-header flex flex-c gap-1">
                        <img
                            src="https://raw.githubusercontent.com/AbdelMeza/Workflow/main/assets/Icons/Workflow_icon.png"
                            alt="workflow-icon"
                            width={25}
                        />
                        <span className="mt-c">WorkFlow</span>
                    </div>

                    <div className="form-content">
                        <div className="upper-content">

                            {/* Identifier field */}
                            <div className="field-container">
                                <label htmlFor="username" className="st-c">
                                    Username or email
                                </label>
                                <input
                                    type="text"
                                    className={`username-input s-fs h-2 br brad-1 ${verifyField("identifier") ? "error" : ""
                                        }`}
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                                {verifyField("identifier")}
                            </div>

                            {/* Password field */}
                            <div className="field-container">
                                <label htmlFor="password" className="st-c">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className={`password-input s-fs h-2 br brad-1 ${verifyField("password") ? "error" : ""
                                        }`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {verifyField("password")}
                            </div>

                            {/* Switch to signup */}
                            <div className="switch-form-container">
                                <span className="st-c">
                                    You don't have an account ?{" "}
                                    <span
                                        className="switch-button"
                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                        onClick={() => navigate('/signup')}
                                    >
                                        Sign up
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="lower-content">
                            <div onClick={handleSubmit}>
                                <Button
                                    content="Login"
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
