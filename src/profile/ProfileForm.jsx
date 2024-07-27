import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppAlert from "../common/AppAlert";
import UserContext from "../auth/UserContext";
import userApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * ProfileForm component renders a form for editing user profile information.
 *
 * It manages the state of the form data and handles form submission.
 * Upon successful save, it updates the current user context and clears form errors.
 * It also provides functionality to delete the user account.
 */
const ProfileForm = ({ logout }) => {
  const navigate = useNavigate(); // Hook for navigation
  const { currentUser, setCurrentUser } = useContext(UserContext); // Get current user from context

  // State for form data, form errors, save confirmation, and loading
  const [formData, setFormData] = useState({
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    state: currentUser.state,
    currentPassword: "",
    newPassword: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.debug(
  //   "ProfileForm",
  //   "currentUser=",
  //   currentUser,
  //   "formData=",
  //   formData,
  //   "formErrors=",
  //   formErrors,
  //   "saveConfirmed=",
  //   saveConfirmed,
  //   "loading=",
  //   loading
  // );

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);

    let profileData = { ...formData };
    if (!formData.newPassword) {
      delete profileData.newPassword;
    }

    try {
      const updatedUser = await userApi.saveProfile(
        currentUser.id,
        profileData
      );
      setCurrentUser(updatedUser);
      setFormErrors([]);
      setSaveConfirmed(true);
    } catch (errors) {
      setFormErrors(errors);
      setSaveConfirmed(false);
    } finally {
      setLoading(false);
    }

    // Clear password fields
    setFormData((f) => ({
      ...f,
      currentPassword: "",
      newPassword: "",
    }));
  }

  // Update form data state on input change
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setFormErrors([]);
  }

  // Handle user account deletion
  async function handleDelete() {
    setLoading(true);
    try {
      await userApi.deleteUser(currentUser.id);
      logout(); // Ensure this function clears the session/token
      navigate("/login");
    } catch (err) {
      setFormErrors([err.message]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Profile</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
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
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      className="form-control"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="form-control"
                      value={formData.newPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="form-group d-flex align-items-center">
                    <label htmlFor="state" className="mr-2">
                      State:
                    </label>
                    <p className="form-control-plaintext mb-0 ms-1" id="state">
                      {formData.state}
                    </p>
                  </div>

                  {formErrors.length > 0 && (
                    <AppAlert type="danger" messages={formErrors} />
                  )}

                  {saveConfirmed && (
                    <AppAlert
                      type="success"
                      messages={["Updated successfully."]}
                    />
                  )}

                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" type="submit">
                      Save Changes
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={handleDelete}
                    >
                      Delete Account
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
