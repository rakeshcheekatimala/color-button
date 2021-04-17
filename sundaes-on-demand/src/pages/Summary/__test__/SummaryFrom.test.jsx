import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "./../SummaryForm";

describe("Summary Page", () => {
  test("default value of checkbox should be not checked", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();
  });

  test("verify button name is confirm order", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(button).toBeDisabled();
  });

  test("checkbox click checked should enable the button,should disable after second click", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    userEvent.click(checkbox);
    expect(checkbox).toBeEnabled();
    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(button).toBeEnabled();
    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    // popover should not be shown initially
    render(<SummaryForm />);
    let popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).not.toBeInTheDocument();

    // popover should appear when mouseover of checkbox label
    const termsandconditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsandconditions);
    popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappears when we moved out
    userEvent.unhover(termsandconditions);

    await waitForElementToBeRemoved(() =>
      screen.getByText(/no ice cream will actually be delivered/i)
    );
  });
});
