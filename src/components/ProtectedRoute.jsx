import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session = sessionStorage.getItem("sr_session_user");

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
