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

    getIngredient =  (id) =>{
       return this.state.ingridentsList[id-1] 
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
        let copiedIngredient = this.getIngredient(event.target.value)
        
        console.log(copiedIngredient)
        if (itemArray.length === 0) {
            itemArray.push(copiedIngredient)
            isFound = true
        } else {

            itemArray.forEach(element => {
                if (element.id === copiedIngredient.id) {
                    isFound = true
                    itemArray = itemArray.filter((item) => {
                        return (item.id !== copiedIngredient.id)
                    })

                }

            });
        }
        if (!isFound) {
            itemArray.push(copiedIngredient)
        }

        this.setState({ ingridentsArray: [...itemArray] })
        copiedProduct[event.target.name] = [...itemArray]
        console.log(itemArray)
        this.setState({ newProduct: copiedProduct })
    }

    render() {


        return (
            <div>
                <h3>Whats the new product?</h3>
                <form onSubmit={this.addNewProduct}>
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
                                        <input type='checkbox' name='ingredients_list' value={ingredient.id} onChange={this.ingridentsListChange}></input>
                                        <label htmlFor='ingredient'>{ingredient.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <select name="category" onChange={this.handleInputChange}>
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