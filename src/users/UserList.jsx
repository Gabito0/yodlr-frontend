import React, { useState, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import userApi from "../api/api";
import UserCard from "./UserCard";

/**
 * UserList component renders a list of users.
 *
 * This component fetches and displays a list of users using the UserCard component.
 * It shows a loading spinner while the data is being fetched.
 * If no users are found, it displays a message indicating that no results were found.
 *
 * This component is routed to at /users.
 *
 * Route -> { UserCard }
 */
const UserList = () => {
  // console.debug("UserList");

  // State to store the list of users
  const [users, setUsers] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    // console.debug("UserList useEffect getUsersOnMount");
    search();
  }, []);

  /** Fetch users and update state */
  async function search() {
    let users = await userApi.getAllUsers();
    setUsers(users);
  }

  if (!users) return <LoadingSpinner />; // Show loading spinner if data is not yet available

  return (
    <div className="UserList col-md-8 offset-md-2">
      {users.length ? (
        <div className="UserList-list">
          {users.map((u) => (
            <UserCard
              key={u.id}
              id={u.id}
              email={u.email}
              firstName={u.firstName}
              lastName={u.lastName}
              state={u.state}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default UserList;
