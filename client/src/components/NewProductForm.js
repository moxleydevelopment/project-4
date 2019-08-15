import React, { Component } from 'react';
import axios from 'axios'
import Checkbox from './Checkbox'

class NewProductForm extends Component {

    state = {
        newProduct: {},
        ingridentsList: []
    }

    componentDidMount() {
        this.getIngredientsList()

    }

    getIngredientsList = async () => {
        const res = await axios.get(`api/v1/ingredients/`)
        this.setState({ ingridentsList: [...res.data] })
        console.log(res.data)

    }


    addNewProduct = async (event) => {
        event.preventDefault()
        const res = await axios.post(`api/v1/products/`, this.state.newProduct)
        console.log(res.data)
    }

    handleInputChange = (event) => {
        const copiedProduct = { ...this.state.newProduct }
        copiedProduct[event.target.name] = event.target.value
        this.setState({ newProduct: copiedProduct })

    }

    render() {


        return (
            <div>
                <h3>Whats the new product?</h3>
                <form onSubmit={this.addNewUser}>
                    <span>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' name='name' onChange={this.handleInputChange} value={this.state.newProduct.name}></input>
                    </span>
                    <span>
                        <label htmlFor='price'>Price: </label>
                        <input type='number' name='price' onChange={this.handleInputChange} value={this.state.newProduct.price}></input>
                    </span>
                    <div>
                        {
                            this.state.ingridentsList.map(ingredient => {
                                return (
                                    <div>
                                        <input type='checkbox' name='ingredients' value={ingredient.name} onChange={this.handleInputChange}></input>
                                        <label htmlFor='ingredient'>{ingredient.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <input type='submit' value='Submit'></input>
                </form>

            </div>
        );
    }
}

export default NewProductForm;