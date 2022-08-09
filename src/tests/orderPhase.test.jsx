import { render, screen } from "../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const VenillaScoop = await screen.findByRole("spinbutton", {
    name: /Venilla/i,
  });
  userEvent.clear(VenillaScoop);
  userEvent.type(VenillaScoop, "1");

  const ChocolateScoop = screen.getByRole("spinbutton", {
    name: /Chocolate/i,
  });
  userEvent.clear(ChocolateScoop);
  userEvent.type(ChocolateScoop, "2");

  const CherriesToppings = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  userEvent.click(CherriesToppings);

  // find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /Order Sundae/i,
  });

  userEvent.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", {
    name: /Order Summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopHeading).toBeInTheDocument();

  const toppingHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingHeading).toBeInTheDocument();

  expect(screen.getByText("1 Venilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order.
  const tcCheckBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckBox);

  const confirmationOrderBtn = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  userEvent.click(confirmationOrderBtn);

  // Confirm the order number on confirmation page.
  const thankYouheading = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouheading).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click "new Order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /Create New Order/i,
  });
  userEvent.click(newOrderButton);

  // check scoops and toppings subtotal have been reset.
  const scoopTotals = screen.getByText("Scoops total: $0.00");
  expect(scoopTotals).toBeInTheDocument();
  const toppingTotals = screen.getByText("Toppings total: $0.00");
  expect(toppingTotals).toBeInTheDocument();

//   await screen.finByRole("spinbutton", { name: /Venilla/i });
//   await screen.finByRole("checkbox", { name: /Cherries/i });
});
