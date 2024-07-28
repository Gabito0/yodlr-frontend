import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppAlert from "../common/AppAlert";

/**
 * SignupForm component renders a signup form.
 *
 * It manages the state of the form data and handles the form submission.
 * It redirects the user to the profile page upon successful signup.
 */
const SignupForm = ({ signup }) => {
  const navigate = useNavigate(); // Hook for navigation

  // State for form data and form errors
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      navigate("/profile"); // Navigate to profile on successful signup
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
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {formErrors.length > 0 && (
                <AppAlert type="danger" messages={formErrors} />
              )}
              <button
                type="submit"
                className="btn btn-primary float-right mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
