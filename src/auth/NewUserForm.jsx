import React, { useState } from "react";
import AppAlert from "../common/AppAlert";
import userApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** New user creation form for admins. */
const NewUserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    isAdmin: false,
    state: "pending",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  /** Handle form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true); // Start loading
    try {
      await userApi.createUser(formData);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        isAdmin: false,
        state: "pending",
      });
      setFormErrors([]);
      setSaveConfirmed(true);
    } catch (errors) {
      setFormErrors(errors);
      setSaveConfirmed(false);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  /** Handle form field change */
  function handleChange(evt) {
    const { name, value, type, checked } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Create New User</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <LoadingSpinner />
              ) : (
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
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <div className="form-group form-check">
                    <input
                      id="isAdmin"
                      type="checkbox"
                      name="isAdmin"
                      className="form-check-input"
                      checked={formData.isAdmin}
                      onChange={handleChange}
                    />
                    <label htmlFor="isAdmin" className="form-check-label">
                      Admin Privileges
                    </label>
                  </div>

                  {formErrors.length ? (
                    <AppAlert type="danger" messages={formErrors} />
                  ) : null}

                  {saveConfirmed ? (
                    <AppAlert
                      type="success"
                      messages={["User created successfully."]}
                    />
                  ) : null}

                  <button className="btn btn-primary float-right" type="submit">
                    Create User
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm;
