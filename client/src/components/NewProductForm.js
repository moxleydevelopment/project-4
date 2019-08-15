import React, { Component } from 'react';
import axios from 'axios'


class NewProductForm extends Component {

    state = {
        newProduct: {},
        ingridentsList: [],
        ingridentsArray: []
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

    ingridentsListChange = (event) => {
        let isFound = false
        const copiedProduct = { ...this.state.newProduct }
        let itemArray = [...this.state.ingridentsArray]
        if (itemArray.length === 0) {
            itemArray.push(event.target.value)
            isFound = true
        } else {

            itemArray.forEach(element => {
                if (element === event.target.value) {
                    isFound = true
                    itemArray = itemArray.filter((item) => {
                        return (item !== event.target.value)
                    })

                }

            });
        }
        if (!isFound) {
            itemArray.push(event.target.value)
        }

        this.setState({ ingridentsArray: [...itemArray] })
        console.log(copiedProduct[event.target.name])
        copiedProduct[event.target.name] = [...itemArray]
        console.log(copiedProduct[event.target.name])
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
                                        <input type='checkbox' name='ingredients' value={ingredient.name} onChange={this.ingridentsListChange}></input>
                                        <label htmlFor='ingredient'>{ingredient.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <select name="categoty" onChange={this.handleInputChange}>
                        <option>Select a categoty</option>
                        <option value="beverage">Beverage</option>
                        <option value="cocktail">Cocktail</option>
                        <option value="appetizers">Appetizers</option>
                        <option value="entrees">Entrees</option>
                        <option value="desserts">Desserts</option>
                        <option value="sides">Sides</option>

                    </select>

                    <input type='submit' value='Submit'></input>
                </form>

            </div>
        );
    }
}

export default NewProductForm;