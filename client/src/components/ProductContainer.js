import React, { Component } from 'react';

import ProductButton from './ProductButton'

class ProductContainer extends Component {
    

    render() {
        return (
            <div className='product-container'>
                {
                    this.props.productList.map(product => {
                        return (
                            <ProductButton
                                key={product.id}
                                name={product.name}
                                id={product.id}
                                addProductToTransaction={this.props.addProductToTransaction}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default ProductContainer;