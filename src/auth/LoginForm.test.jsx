import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserContext from "./UserContext";
import { vi, expect, it } from "vitest";

// Mock the login function
vi.mock("../api/api");

it("matches snapshot", function () {
  const mockLogin = vi.fn();
  const mockCurrentUser = null;

  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: mockCurrentUser }}>
        <LoginForm login={mockLogin} />
      </UserContext.Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("submits form with valid data", async function () {
  const mockLogin = vi.fn().mockResolvedValue({ success: true });

  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: null }}>
        <LoginForm login={mockLogin} />
      </UserContext.Provider>
    </MemoryRouter>
  );

  fireEvent.change(getByLabelText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(getByLabelText("Password"), {
    target: { value: "password" },
  });

  fireEvent.click(getByText("Submit"));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
