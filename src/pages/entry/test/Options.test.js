import { render, screen } from '@testing-library/react'

import Options from '../Option';

test("Displays image fro each scoop options from server", async () => {
    render(<Options OptionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name : /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    //Matching alt text
    const altText = scoopImages.map(elem => elem.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Venilla scoop']);
})