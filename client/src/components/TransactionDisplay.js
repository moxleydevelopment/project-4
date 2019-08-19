import React, { Component } from 'react';

class TransactionDisplay extends Component {
    render() {

        let itemList = this.props.productsAddedToTransaction.map((product, index) =>{
            return (
                <button onClick={this.props.selectItem} value={index}>
                   
                     {product.name}
                        {product.price}
                  

                </button>
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