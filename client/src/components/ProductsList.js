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
        const res = await axios.get(`/api/v1/ingredients/`)
        this.setState({ ingridentsList: [...res.data] })
    }

    updateProduct = async (event) => {
        event.preventDefault()
        const res = await axios.put(`/api/v1/products/${this.state.product.id}/`, this.state.product)
        console.log(res.data)
    }

    deleteProduct = async () => {
        const res = await axios.delete(`/api/v1/products/${this.state.product.id}/`)
        console.log(res.data)
    }

    handleInputChange = (event) => {
        const copiedProduct = { ...this.state.product }
        copiedProduct[event.target.name] = event.target.value
        this.setState({ product: copiedProduct })

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

    getIngredient = (name) => {
        let item = this.state.ingridentsList.filter(item => {
            return (item.name == name)
        })
        return item
    }

    ingridentsListChange = (event) => {
        console.log(event.target.value)
        let isFound = false
        const copiedProduct = { ...this.state.product }
        console.log(copiedProduct)
        this.setState({ ingridientsArray: [...copiedProduct[event.target.name]] })
        console.log(this.state.ingridientsArray)
        let itemArray = [...this.state.ingridientsArray]
        if (itemArray.length === 0) {
            let item = this.getIngredient(event.target.value)
            console.log(item[0])
            itemArray.push(item[0])
            isFound = true
        } else {

            itemArray.forEach(element => {
                if (element.name == event.target.value) {
                    isFound = true
                    itemArray = itemArray.filter((item) => {
                        return (item.name !== event.target.value)
                    })

                }

            });
        }
        if (!isFound) {
            let item = this.getIngredient(event.target.value)
            itemArray.push(item[0])
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
                            <form className='form' onSubmit={this.updateProduct}>


                                <label htmlFor='name'>Name: </label>
                                <input type='text' name='name' onChange={this.handleInputChange} value={this.state.product.name}></input>

                                <label htmlFor='price'>Price: </label>
                                <input type='number' name='price' onChange={this.handleInputChange} value={this.state.product.price}></input>

                                <div>
                                    {
                                        this.state.ingridentsList.map(ingredient => {

                                            return (
                                                <div key={ingredient.id}>
                                                    <input type='checkbox' name='ingredients_list' value={ingredient.name} onChange={this.ingridentsListChange} checked={this.checkForIngredient(ingredient)}></input>
                                                    <label htmlFor='ingredient'>{ingredient.name}</label>

                                                </div>

                                            )

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
                            <form onSubmit={this.deleteProduct}>
                                <input className="deleteBtn" type='submit' value='Delete'></input>
                            </form>
                        </div>

                        : <table className='table-pr'>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Select</th>
                            </tr>
                            {this.state.productList.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.name} </td>
                                        <td>{product.price}</td>
                                        <td><button onClick={this.editProductForm} value={product.id} >Edit</button></td>

                                    </tr>
                                )
                            })}
                        </table>
                }



            </div>
        );
    }
}

export default ProductsList;