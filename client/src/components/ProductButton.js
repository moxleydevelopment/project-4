import React, { Component } from 'react';

class ProductButton extends Component {
    render() {
        return (
            <div className='product-div'>
                <button className={`product-btn ${this.props.category}`} onClick={this.props.addProductToTransaction} value={this.props.id}>{this.props.name}</button>
            </div>
        );
    }
}

export default ProductButton;