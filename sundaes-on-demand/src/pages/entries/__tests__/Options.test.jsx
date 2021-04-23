import React from "react";
import { render, screen } from "./../../../test-utils/testing-library-utils";
import Options from "./../Options";

test("should displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  const scoopImages = await screen.findAllByRole("img", { name: /chip$/i });
  expect(scoopImages).toHaveLength(4);
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Mint chip",
    "Vanilla chip",
    "Chocolate chip",
    "Salted caramel chip",
  ]);
});

test("should dsiplay image for each toppings from server", async () => {
  render(<Options optionType="toppings" />);
  const toppingsImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingsImages).toHaveLength(3);
  const altText = toppingsImages.map((element) => element.alt);
  expect(altText).toEqual([
    "M&Ms topping",
    "Hot fudge topping",
    "Peanut butter cups topping",
  ]);
});
