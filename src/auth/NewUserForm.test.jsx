import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewUserForm from "./NewUserForm";
import UserContext from "./UserContext";
import userApi from "../api/api";
import { vitest, expect, it } from "vitest";

// Mock the userApi.createUser method
vi.mock("../api/api");

it("matches snapshot", function () {
  const mockUser = { currentUser: { isAdmin: true } };

  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={mockUser}>
        <NewUserForm />
      </UserContext.Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("submits form with valid data", async function () {
  const mockUser = { currentUser: { isAdmin: true } };
  userApi.createUser.mockResolvedValueOnce({});

  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={mockUser}>
        <NewUserForm />
      </UserContext.Provider>
    </MemoryRouter>
  );

  fireEvent.change(getByLabelText("Email"), {
    target: { value: "newuser@example.com" },
  });
  fireEvent.change(getByLabelText("First Name"), {
    target: { value: "New" },
  });
  fireEvent.change(getByLabelText("Last Name"), {
    target: { value: "User" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.click(getByText("Admin Privileges"));

  fireEvent.click(getByText("Create User"));

  await waitFor(() => {
    expect(userApi.createUser).toHaveBeenCalledWith({
      email: "newuser@example.com",
      firstName: "New",
      lastName: "User",
      password: "password123",
      isAdmin: true,
      state: "pending",
    });
  });
});
