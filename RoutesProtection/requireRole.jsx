import { Navigate } from "react-router-dom"
import authentificationManagement from "../Stores/Authentification"

export default function RequireRole({ allowedRole, children }) {
    const { userData } = authentificationManagement()

    if (!userData) return <Navigate to="/" replace />

    if (!allowedRole.includes(userData.role)) {
        return <Navigate to="/" replace />
    }

    return children
}
