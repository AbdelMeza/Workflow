import authentificationManagement from "../Stores/Authentification"
import { useEffect } from "react"

export function VerifyAuth({ children }) {
  const { getUserData, userData } = authentificationManagement()

  useEffect(() => {
    const fetchUserData = async () => {
      await getUserData()
    }
    
    fetchUserData()
  }, [])
  
  if (userData === undefined) {
    return null
  }

  return children
}
