import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Option from "../Option";

import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoop changes', async () => {
     render(<Option OptionType="scoops" />);

     // Start with 0.
     const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });

     expect(scoopSubtotal).toHaveTextContent('0.00'); 

     // add 1 scoop 
     const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Venilla' });
    
     userEvent.clear(vanillaScoop);
     userEvent.type(vanillaScoop, '1');

     expect(scoopSubtotal).toHaveTextContent('2.00');
    
     // add 2 more another scoop. to make count 3.
     const chocolateScoop = await screen.findByRole('spinbutton', { name: "Chocolate" });

     userEvent.clear(chocolateScoop);
     userEvent.type(chocolateScoop, '2');

     expect(scoopSubtotal).toHaveTextContent('6.00');
});

test("update toppings subtotal when topping changes", async () => {
    render(<Option OptionType='toppings' />);

    // test for price 0.
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });

    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // add mAndM and test price
    const mAndMCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });

    userEvent.click(mAndMCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("1.50");

    // add two more toppings and test the price.
    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: "Hot fudge" });
    userEvent.click(hotFudgeCheckbox);
    const CherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" });
    userEvent.click(CherriesCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("4.50");

    // uncheck one
    userEvent.click(CherriesCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("3.00");
});

describe('Grand Total:', () => {
    // test('Start at zero',  () => {
    //     render(<OrderEntry />);
    //     const grandTotalElement = screen.getByRole('heading', { name: /grand total: \$/i });
    //     expect(grandTotalElement).toHaveTextContent('0.00')
    // })

    test('grand total updates properly if scoop added first', async() => {
        render(<OrderEntry />);
        const grandTotalElement = screen.getByRole('heading', { name: /grand total: \$/i });

        expect(grandTotalElement).toHaveTextContent('0.00')

        const scoopSpinButton = await screen.findByRole('spinbutton', { name: 'Venilla' });
        userEvent.clear(scoopSpinButton);
        userEvent.type(scoopSpinButton, '1');

        expect(grandTotalElement).toHaveTextContent('2.00')
    })
    test('grand total updates properly if topping added first', async () => {
        render(<OrderEntry />);
        const grandTotalElement = screen.getByRole('heading', { name: /grand total: \$/i });
        const toppingCheckbox = await screen.findByRole('checkbox', { name: /M&Ms/i });
        userEvent.click(toppingCheckbox);

        expect(grandTotalElement).toHaveTextContent("1.50");
    })
    test('grand total updates properly if the item is removed', async () => {
        render(<OrderEntry />);
        const grandTotalElement = screen.getByRole('heading', { name: /grand total: \$/i });
        const venillaScoop = await screen.findByRole('spinbutton', { name: /Venilla/i});
        const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
        // adding venilla
        userEvent.clear(venillaScoop);
        userEvent.type(venillaScoop, '1');
        // adding cherries
        userEvent.click(cherriesCheckbox);
        // testing grand total. 
        expect(grandTotalElement).toHaveTextContent("3.50");
        // removing venilla
        userEvent.clear(venillaScoop);
        userEvent.type(venillaScoop, "0");
        // testing grand total after removing venilla
        expect(grandTotalElement).toHaveTextContent("1.50");
    })
})

