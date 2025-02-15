import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const { user, loading } = useAuth();
  if (isLoading || loading) return <Loading />;
  if (role === "admin" && user) return children;
  return <Navigate to={"/dashboard/profile"} />;
};
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
