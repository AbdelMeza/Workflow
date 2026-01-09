import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authentificationManagement from "../Stores/Authentification"

export default function DashboardRedirect() {
    const { userData } = authentificationManagement()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData) {
            navigate("/", { replace: true })
            return
        }

        navigate(`/dashboard/${userData.role}`, { replace: true })
    }, [userData, navigate])

    return null
}
