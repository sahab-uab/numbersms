import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  console.log(user);

  if (token) {
    if (user.role === "user") {
      return <Navigate to="/user/dashboard" />;
    } else {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return children;
};

export default PrivateRoute;
