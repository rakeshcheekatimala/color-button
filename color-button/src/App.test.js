import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("button has initial color value", () => {
  render(<App />);
  const linkElement = screen.getByRole("button", { name: "Change to blue" });
  expect(linkElement).toHaveStyle({ backgroundColor: "red" });
  expect(linkElement).toBeInTheDocument();
});

test("color button functionality should work as expected", () => {
  render(<App />);
  let colorButton = screen.getByRole("button", { name: "Change to blue" });
  fireEvent.click(colorButton);
  colorButton = screen.getByRole("button", { name: "Change to red" });
  expect(colorButton).toHaveTextContent("Change to red");
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});

test("checkbox with button functionality", () => {
  // button has to be enabled when page loads
  // checkbox has to be unchecked
  // once checkbox is clicked , button has to be disabled.
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("checkbox behavior with button functionality", () => {
  render(<App />);
  // verify the checkbox is checked initial and button is enabled
  // fire the click event for checkbox and button is disabled.
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("button should be gray when checkbox is disabled", () => {
  render(<App />);
  // check button color first when disabled.
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
});
