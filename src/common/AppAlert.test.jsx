import React from "react";
import { render } from "@testing-library/react";
import AppAlert from "./AppAlert";

it("renders without crashing", function () {
  render(<AppAlert />);
});

it("matches snapshot for danger", function () {
  let messages = ["Everything is broken", "Run for the hills"];
  const { asFragment } = render(<AppAlert type="danger" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot for success", function () {
  let messages = ["Everything is awesome!"];
  const { asFragment } = render(
    <AppAlert type="success" messages={messages} />
  );
  expect(asFragment()).toMatchSnapshot();
});
