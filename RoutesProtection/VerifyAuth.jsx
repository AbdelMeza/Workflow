import { Navigate, Outlet } from "react-router-dom"

export function VerifyAuth({ userData }) {
  if (userData === undefined) {
    return null
  }

  if (!userData) {
    return <Navigate to="/signup" replace />
  }

  return <Outlet />
}
