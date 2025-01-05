import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // 检查用户是否已登录

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login?redirectMessage=Please+login+to+access+this+page" />
  );
};

export default PrivateRoute;
