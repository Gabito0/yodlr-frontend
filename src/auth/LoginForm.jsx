import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppAlert from "../common/AppAlert";
import UserContext from "./UserContext";

/**
 * LoginForm component renders a login form.
 *
 * It manages the state of the form data and handles the form submission.
 * It redirects the user to the profile page upon successful login.
 */
const LoginForm = ({ login }) => {
  const navigate = useNavigate(); // Hook for navigation
  const { currentUser } = useContext(UserContext); // Get current user from context

  // State for form data and form errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // Redirect to profile if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate(`/profile`);
    }
  }, [currentUser, navigate]);

  // console.debug(
  //   "LoginForm",
  //   "login=",
  //   typeof login,
  //   "formData=",
  //   formData,
  //   "formErrors=",
  //   formErrors
  // );

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/profile"); // Navigate to profile on successful login
    } else {
      setFormErrors(result.errors); // Set form errors on failure
    }
  }

  // Update form data state on input change
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>
              {formErrors.length > 0 && (
                <AppAlert type="danger" messages={formErrors} />
              )}
              <button className="btn btn-primary float-right mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
