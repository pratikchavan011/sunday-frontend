import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm.jsx";

describe("SummaryForm", () => {
  test("checkbox is unchecked by default", () => {
    render(<SummaryForm />);
    const tAndCCheckboxElm = screen.getByRole("checkbox", {
      name: /I agree to terms and conditions/i,
    });
    expect(tAndCCheckboxElm).not.toBeChecked();
  });

  test("button is disabled by default", () => {
    render(<SummaryForm />);
    const confirmOrderBtn = screen.getByRole("button", {
      name: /Confirm Order/i,
    });
    expect(confirmOrderBtn).toBeDisabled();
  });

  test("Checking checkbox enables the order button", () => {
    render(<SummaryForm />);
    const tAndCCheckboxElm = screen.getByRole("checkbox", {
      name: /I agree to terms and conditions/i,
    });
    const confirmOrderBtn = screen.getByRole("button", {
      name: /Confirm Order/i,
    });
    userEvent.click(tAndCCheckboxElm);

    expect(confirmOrderBtn).toBeEnabled();
  });

  test("unChecking checkbox disables the order button", () => {
    render(<SummaryForm />);
    const tAndCCheckboxElm = screen.getByRole("checkbox", {
      name: /I agree to terms and conditions/i,
    });
    const confirmOrderBtn = screen.getByRole("button", {
      name: /Confirm Order/i,
    });
    userEvent.click(tAndCCheckboxElm);
    expect(confirmOrderBtn).toBeEnabled();

    userEvent.click(tAndCCheckboxElm);
    expect(confirmOrderBtn).toBeDisabled();
  });
});

describe("poover", () => {
  test("popover respond to hover", async () => {
    // popover starts out hidden
    render(<SummaryForm />);
    const tAndCCheckboxElm = screen.getByText(/terms and conditions/i);
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    userEvent.hover(tAndCCheckboxElm);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(tAndCCheckboxElm);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
