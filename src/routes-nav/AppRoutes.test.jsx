import React from "react";
import { render } from "@testing-library/react";
import Routes from "./AppRoutes";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { expect, it } from "vitest";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Routes />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Routes />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
