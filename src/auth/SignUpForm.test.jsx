import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignupForm from "./SignUpForm";
import { vitest, expect, it } from "vitest";

// Mock the signup function
const mockSignup = vitest.fn();

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <SignupForm signup={mockSignup} />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("submits form with valid data", async function () {
  mockSignup.mockResolvedValueOnce({ success: true });

  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <SignupForm signup={mockSignup} />
    </MemoryRouter>
  );

  fireEvent.change(getByLabelText("Email"), {
    target: { value: "newuser@example.com" },
  });
  fireEvent.change(getByLabelText("First name"), {
    target: { value: "New" },
  });
  fireEvent.change(getByLabelText("Last name"), {
    target: { value: "User" },
  });

  fireEvent.click(getByText("Submit"));

  await waitFor(() => {
    expect(mockSignup).toHaveBeenCalledWith({
      email: "newuser@example.com",
      firstName: "New",
      lastName: "User",
    });
  });
});

it("shows error messages on failed submission", async function () {
  mockSignup.mockResolvedValueOnce({
    success: false,
    errors: ["Email is already taken", "Password is too weak"],
  });

  const { getByLabelText, getByText, findByText } = render(
    <MemoryRouter>
      <SignupForm signup={mockSignup} />
    </MemoryRouter>
  );

  fireEvent.change(getByLabelText("Email"), {
    target: { value: "existinguser@example.com" },
  });
  fireEvent.change(getByLabelText("First name"), {
    target: { value: "Existing" },
  });
  fireEvent.change(getByLabelText("Last name"), {
    target: { value: "User" },
  });

  fireEvent.click(getByText("Submit"));

  expect(await findByText("Email is already taken")).toBeInTheDocument();
  expect(await findByText("Password is too weak")).toBeInTheDocument();
});
