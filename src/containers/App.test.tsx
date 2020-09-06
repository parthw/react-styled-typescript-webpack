// https://testing-library.com/docs/react-testing-library/cheatsheet

import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, cleanup } from "@testing-library/react";

import App from "./App";

afterEach(cleanup);

describe("<App />", () => {
  test("renders App component", () => {
    const { getByTestId } = render(<App />);
    const text = getByTestId("text");
    expect(text).toHaveTextContent("Custom React Template");
  });
});
