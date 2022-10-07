import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
