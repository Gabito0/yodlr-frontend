import React from "react";
import { Link } from "react-router-dom";

/** Show limited information about a user
 *
 *  Is rendered by UserList to show a "card" for each user.
 *
 *  UserList -> UserCard
 */

const UserCard = ({ id, email, firstName, lastName, state }) => {
  return (
    <Link
      className="UserCard card mb-3 text-decoration-none"
      to={`/user/${id}`}
    >
      <div className="card-body">
        <h6 className="card-title">{email}</h6>
        <p className="card-text mb-1">
          <strong>First Name:</strong> {firstName}
        </p>
        <p className="card-text">
          <strong>Last Name:</strong> {lastName}
        </p>
        <span
          className={`badge rounded-pill ${
            state === "active" ? "text-bg-success" : "text-bg-warning"
          }`}
        >
          {state}
        </span>
      </div>
    </Link>
  );
};

export default UserCard;
