import { render, screen } from '../../../test-utils/testing-library-utils';

import OrderConfirmation from '../OrderConfirmation';

describe('OrderConfirmation', () => {
    test('initial Checks', () => {
        render(<OrderConfirmation />);

        const loadingElm = screen.getByRole('heading', { name: /Loading.../i });

        expect(loadingElm).toBeInTheDocument();
    });
});