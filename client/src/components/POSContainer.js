import React, { Component } from 'react';
import TransactionDisplay from './TransactionDisplay'
import CategoryContainer from './CategoryContainer'
import ProductContainer from './ProductContainer'
import ModButtonContainer from './ModButtonContainer'
import axios from 'axios'


class POSContainer extends Component {
    state = {
        productsAddedToTransaction: [],
        productList: [],
        categoryTypeArray: [
            "appetizers",
            'entrees',
            'sides',
            'desserts',
            'beverage',
            'cocktail',

        ]

    }
    getProductList = async () => {
        const res = await axios.get(`/api/v1/products/`)
        this.setState({ productList: res.data })

    }


    componentDidMount() {
        this.getProductList()
    }

    switchCategoty = (event) =>{
        
    }

    addProductToTransaction = (event) => {
        let copiedProductsAddedToTransaction = [...this.state.productsAddedToTransaction]
        let productMatch = this.state.productList.filter(item => {
             return (item.id == event.target.value)
        }) 
        let product = productMatch[0]
        copiedProductsAddedToTransaction.push(product)
        console.log(product)
        this.setState({ productsAddedToTransaction: copiedProductsAddedToTransaction })

    }
    render() {
        return (
            <div className='pos-container'>
                <TransactionDisplay 
                productsAddedToTransaction={this.state.productsAddedToTransaction}
                ></TransactionDisplay>
                <CategoryContainer
                 categoryTypeArray={this.state.categoryTypeArray}
                ></CategoryContainer>
                <ProductContainer
                    productList={this.state.productList}
                    addProductToTransaction={this.addProductToTransaction}
                ></ProductContainer>
                <ModButtonContainer></ModButtonContainer>


            </div>
        );
    }
}

export default POSContainer;