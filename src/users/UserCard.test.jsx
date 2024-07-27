import React from "react";
import { render } from "@testing-library/react";
import UserCard from "./UserCard";
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserCard
        email="testusers"
        firstName="testName"
        lastName="testLast"
        state="active"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot with state pending", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserCard
        email="testUser2"
        firstName="testFirst"
        lastName="testLast"
        state="pending"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
