import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** "Higher-Order Component" for private routes.
 *
 *  In routing component, use these instead of <Route ...>. This component
 *  will check if there is a valid current user and only continues to the
 *  route if so. If no user is present, redirects to login form.
 */

const AdminRoute = () => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;
