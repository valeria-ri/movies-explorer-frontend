import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute (props) {
  if (!props.isLoggedIn) {
    return <Navigate to='/' />
  }
  return <Outlet />;
}

export default ProtectedRoute;