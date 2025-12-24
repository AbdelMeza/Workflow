import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authentificationManagement from "../Stores/Authentification"

export function RequireAuth({ children }) {
    const { getUserData, userData } = authentificationManagement()
    const navigate = useNavigate()

    useEffect(() => {
        getUserData()
    }, [])

    if (userData === undefined) {
        return null
    }

    // 🚫 Not authenticated
    if (userData === null) {
        navigate("/")
        return null
    }

    // ✅ Authenticated
    return children
}
