import React, { Component } from 'react';

class TransactionDisplay extends Component {

    state = {

    }
    render() {


        let itemList = this.props.productsAddedToTransaction.map((product, index) => {

            return (
                <tr className={`transactionBTN`} >
                    <td><button onClick={this.props.selectItem} value={index}>O</button></td>
                    <td className='name'>{product.name}</td>
                    <td className='price'>{product.price}</td>
                </tr>
            )
        })



        return (
            <div className='transaction-display'>
                <table>
                    <tr>
                        <th>Selection</th>
                        <th>Item</th>
                        <th>Price</th>
                    </tr>
                    {itemList}
                </table>

                
            </div>
        );
    }
}

export default TransactionDisplay;