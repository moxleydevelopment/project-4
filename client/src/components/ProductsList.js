import React, { Component } from 'react';
import axios from 'axios'

class ProductsList extends Component {
    state ={
        productList: []
    }

    getProductList = async () =>{
        const res = await axios.get(`/api/v1/products/`)
        this.setState({productList: res.data})
    }

    componentDidMount(){
        this.getProductList()
       } 
    render() {
        return (
            <div>
                <h1>Inventory</h1>
                {
                    this.state.productList.map(product =>{
                       return (<p>{product.name}          {product.price}</p>)
                    })
                }
                
            </div>
        );
    }
}

export default ProductsList;