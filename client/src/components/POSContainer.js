import React, { Component } from 'react';
import TransactionDisplay from './TransactionDisplay'
import CategoryContainer from './CategoryContainer'
import ProductContainer from './ProductContainer'
import ModButtonContainer from './ModButtonContainer'


class POSContainer extends Component {
    render() {
        return (
            <div className='pos-container'>
                <TransactionDisplay></TransactionDisplay>
                <CategoryContainer></CategoryContainer>
                <ProductContainer></ProductContainer>
                <ModButtonContainer></ModButtonContainer>

               
            </div>
        );
    }
}

export default POSContainer;