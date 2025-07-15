import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // If token does not exist, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access to protected routes
  return <Outlet />;
}
