import React from "react";
import UserContext from "./auth/UserContext";
const demoUser = {
  id: 10,
  email: "test@test.com",
  firstName: "testuser",
  lastName: "testlast",
  state: "active",
  isAdmin: true,
};

const UserProvider = ({ children, currentUser = demoUser }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
