import React, { Component } from 'react';

class TransactionDisplay extends Component {
    render() {

        let itemList = this.props.productsAddedToTransaction.map(product =>{
            return (
                <div>
                    <span>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </span>

                </div>
            )
        })
        return (
            <div className='transaction-display'>
                
                  {itemList}
            </div>
        );
    }
}

export default TransactionDisplay;