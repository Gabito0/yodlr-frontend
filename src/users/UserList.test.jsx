import React from "react";
import { render } from "@testing-library/react";
import Users from "./UserList";
it("matches snapshot", function () {
  const { asFragment } = render(<Users />);
  expect(asFragment()).toMatchSnapshot();
});
