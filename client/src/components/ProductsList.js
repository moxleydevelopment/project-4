import React, { Component } from 'react';
import axios from 'axios'


class ProductsList extends Component {
    state = {
        productList: [],
        editProductFormDisplayed: false,
        product: {},
        ingridentsList: [],
        ingridientsArray: []

    }

    getProductList = async () => {
        const res = await axios.get(`/api/v1/products/`)
        this.setState({ productList: res.data })

    }

    getProduct = async (productId) => {
        const res = await axios.get(`/api/v1/products/${productId}/`)
        this.setState({
            product: res.data,
            editProductFormDisplayed: true

        })

    }

    getIngredientsList = async () => {
        const res = await axios.get(`api/v1/ingredients/`)
        this.setState({ ingridentsList: [...res.data] })
    }

    updateProduct = async (event) =>{
        event.preventDefault()
        const res = await axios.put(`api/v1/products/${this.state.product.id}/`, this.state.product)
        console.log(res.data)
    }

    handleInputChange = (event) => {
        const copiedProduct = { ...this.state.product }
        copiedProduct[event.target.name] = event.target.value
        this.setState({ Product: copiedProduct })

    }

    editProductForm = (event) => {
        this.getIngredientsList()
        const id = event.target.value
        this.getProduct(id)


    }

    checkForIngredient = (ingredient) => {
        let checkedValue = false
        this.state.product.ingredients_list.forEach(element => {

            if (ingredient.name === element.name) {
                checkedValue = true
            }
        })
        return checkedValue


    }

    ingridentsListChange = (event) => {
        console.log('im firing 2')
        let isFound = false
        const copiedProduct = { ...this.state.product }
        console.log(copiedProduct)
        this.setState({ingridientsArray: [...copiedProduct[event.target.name]]})
        let itemArray = [...this.state.ingridientsArray]
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

        this.setState({ ingridientsArray: [...itemArray] })
        copiedProduct[event.target.name] = [...itemArray]
        this.setState({ product: copiedProduct })
    }

    componentDidMount() {
        this.getProductList()
    }
    render() {
        return (
            <div>
                <h1>Inventory</h1>
                {
                    this.state.editProductFormDisplayed ?
                        <div>
                            <form onSubmit={this.updateProduct}>

                                <span>
                                    <label htmlFor='name'>Name: </label>
                                    <input type='text' name='name' onChange={this.handleInputChange} value={this.state.product.name}></input>
                                </span>
                                <span>
                                    <label htmlFor='price'>Price: </label>
                                    <input type='number' name='price' onChange={this.handleInputChange} value={this.state.product.price}></input>
                                </span>
                                <div>
                                    {
                                        this.state.ingridentsList.map(ingredient => {


                                            if (this.checkForIngredient(ingredient)) {
                                                return (
                                                    <div>
                                                        <input type='checkbox' name='ingredients_list' value={ingredient.name} onChange={this.ingridentsListChange} checked={this.checkForIngredient(ingredient)}></input>
                                                        <label htmlFor='ingredient'>{ingredient.name}</label>

                                                    </div>

                                                )
                                             } else {

                                                 return (
                                                     <div>
                                                        <input type='checkbox' name='ingredients_list' value={ingredient.name} onChange={this.ingridentsListChange}></input>
                                                         <label htmlFor='ingredient'>{ingredient.name}</label>
                                                    </div>
                                                 )
                                             }

                                        })
                                    }
                                </div>
                                <select name="category" onChange={this.handleInputChange}>
                                    <option value={this.state.product.category}>{this.state.product.category}</option>
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

                        : this.state.productList.map(product => {
                            return (
                                <div key={product.id}>
                                    <p>{product.name}          {product.price}
                                        <button onClick={this.editProductForm} value={product.id} >Edit</button>
                                    </p>
                                </div>
                            )
                        })
                }



            </div>
        );
    }
}

export default ProductsList;