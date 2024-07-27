import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import UserContext from "../auth/UserContext";
import userApi from "../api/api";
import { vi } from "vitest";

vi.mock("../api/api");

const mockUser = {
  id: 1,
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  state: "active",
};

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: mockUser }}>
        <ProfileForm logout={() => {}} />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: mockUser }}>
        <ProfileForm logout={() => {}} />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("submits form with valid data", async () => {
  userApi.saveProfile.mockResolvedValueOnce({
    ...mockUser,
    firstName: "Updated",
  });

  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: mockUser }}>
        <ProfileForm logout={() => {}} />
      </UserContext.Provider>
    </MemoryRouter>
  );

  fireEvent.change(getByLabelText("First Name"), {
    target: { value: "Updated" },
  });
  fireEvent.click(getByText("Save Changes"));

  await waitFor(() => {
    expect(userApi.saveProfile).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ firstName: "Updated" })
    );
  });
});
