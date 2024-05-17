// import {render,screen} from '@testing-library/react'
// import Expenseshower from './Expenseshower'
// describe('expense checker',()=>{
//     test('renderhelloworldastext',()=>{
//         render(<Expenseshower/>)
//         const helloworldele= screen.getByText('Money Spent')
//         expect(helloworldele).toBeInTheDocument()
//     })



// })
import { render, screen } from '@testing-library/react';
import Expenseshower from './Expenseshower';

describe('expense checker', () => {
    test('renders Money Spent text', () => {
        render(<Expenseshower />);
        const moneySpentElement = screen.getByText('Money Spent');
        expect(moneySpentElement).toBeInTheDocument();
    });
});
