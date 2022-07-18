import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Option from "../Option";
import { OrderDetailsProvider } from '../../../context/orderDetails'

test('upate scoop subtotal when scoop changes', async () => {
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
})

