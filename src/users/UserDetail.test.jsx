import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDetail from "./UserDetail"; // Ensure the path is correct
import { UserProvider } from "../testUtils"; // Ensure the path is correct

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <UserDetail />
      </UserProvider>
    </MemoryRouter>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/user/10"]}>
      <UserProvider>
        <UserDetail />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
