import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignUpForm";
import UserList from "../users/UserList";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserDetail from "../users/UserDetail";
import ProfileForm from "../profile/ProfileForm";
import NewUserForm from "../auth/NewUserForm";

const AppRoutes = ({ login, signup, logout }) => {
  return (
    <div className="pt-5">
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/profile" element={<ProfileForm logout={logout} />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new-user" element={<NewUserForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default AppRoutes;
