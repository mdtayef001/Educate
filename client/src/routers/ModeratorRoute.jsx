import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

import PropTypes from "prop-types";
import Loading from "../components/Loading";

const ModeratorRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const { user, loading } = useAuth();
  if (isLoading || loading) return <Loading />;
  if ((role === "moderator" && user) || (role === "admin" && user))
    return children;
  return <Navigate to={"/dashboard/profile"} />;
};

ModeratorRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModeratorRoute;
