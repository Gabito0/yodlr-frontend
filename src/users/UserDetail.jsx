import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** User Detail page.
 *
 *  Renders information about a user.
 *
 *  Routed at /users/:id
 *
 *  Routes -> UserDetail
 */

const UserDetail = () => {
  const { id } = useParams();
  // console.debug("UserDetail", "id=", id);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUserDetail() {
      try {
        const user = await userApi.getCurrentUser(id);
        setUser(user);
      } catch (err) {
        setError("Error fetching user details");
        // console.error("Error fetching user details", err);
      } finally {
        setLoading(false);
      }
    }
    getUserDetail();
  }, [id]);

  async function handleActivate() {
    try {
      await userApi.activateUser({ id });
      const updatedUser = await userApi.getCurrentUser(id);
      setUser(updatedUser);
    } catch (err) {
      setError("Error activating user");
      // console.error("Error activating user", err);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-danger">{error}</p>;
  if (!user) return <p className="text-warning">User not found.</p>;

  return (
    <div className="UserDetail col-md-8 offset-md-2 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{user.email}</h5>
          <p className="card-text">
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p className="card-text">
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p className="card-text">
            <strong>State:</strong> {user.state}
          </p>
          {user.state !== "active" && (
            <button className="btn btn-primary" onClick={handleActivate}>
              Activate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
