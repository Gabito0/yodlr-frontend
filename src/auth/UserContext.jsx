import React from "react";

/**
 * UserContext provides a context for user information in the application.
 *
 * This context allows different parts of the app to access and update the current
 * user's information, such as their ID, email, and role (e.g., admin status).
 * It facilitates state management for user data across various components.
 *
 * Components can consume this context to access user data or to make updates
 * when user information changes, such as during login, logout, or profile updates.
 */

const UserContext = React.createContext();

export default UserContext;
