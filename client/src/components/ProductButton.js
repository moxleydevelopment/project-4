import React, { Component } from 'react';

class ProductButton extends Component {
    render() {
        return (
            <div className="product-btn">
                <button onClick={this.props.addProductToTransaction} value={this.props.id}>{this.props.name}</button>
            </div>
        );
    }
}

export default ProductButton;