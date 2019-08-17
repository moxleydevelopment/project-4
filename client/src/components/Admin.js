import React, { Component } from 'react';
import NewUserForm from './NewUserForm'
import UserList from './UserList'
import NewProductForm from "./NewProductForm";
import ProductsList from './ProductsList';
import NewIngredientForm from './NewIngredientForm'
import IngredientList from './IngredientList';

class Admin extends Component {

    state = {
        displayNewUserForm: false,
        displayUsersList: false,
        displayNewProductForm: false,
        displayProductList: false,
        displayNewIngredientForm: false,
        displayIngredientList: false,

    }

    addNewUser = () => {
        if (this.displayNewUserForm) {
            this.setState({ displayNewUserForm: false })
        } else {
            this.setState({
                displayNewUserForm: true,
                displayUsersList: false,
                displayNewProductForm: false,
                displayProductList: false,
                displayNewIngredientForm: false,
                displayIngredientList: false
            })
        }
    }

    displayUsers = () => {
        if (this.displayUsersList) {
            this.setState({ displayUsersList: false })
        } else {
            this.setState({
                displayUsersList: true,
                displayNewUserForm: false,
                displayNewProductForm: false,
                displayProductList: false,
                displayNewIngredientForm: false,
                displayIngredientList: false

            })
        }
    }

    addNewProduct = () => {
        if (this.displayNewProductForm) {
            this.setState({ displayNewProductForm: false })
        } else {
            this.setState({
                displayNewProductForm: true,
                displayUsersList: false,
                displayNewUserForm: false,
                displayProductList: false,
                displayNewIngredientForm: false,
                displayIngredientList: false

            })
        }
    }

    displayProduct = () => {
        if (this.displayProductList) {
            this.setState({ displayProductList: false })
        } else {
            this.setState({
                displayProductList: true,
                displayNewUserForm: false,
                displayUsersList: false,
                displayNewProductForm: false,
                displayNewIngredientForm: false,
                displayIngredientList: false

            })
        }
    }

    addNewIngredient = () => {
        if (this.displayNewIngredientForm) {
            this.setState({ displayNewIngredientForm: false })
        } else {
            this.setState({
                displayNewUserForm: false,
                displayUsersList: false,
                displayNewProductForm: false,
                displayProductList: false,
                displayNewIngredientForm: true,
                displayIngredientList: false
            })
        }
    }

    displayIngredient = () => {
        if (this.displayIngredientList) {
            this.setState({ displayIngredientList: false })
        } else {
            this.setState({
                displayNewUserForm: false,
                displayUsersList: false,
                displayNewProductForm: false,
                displayProductList: false,
                displayNewIngredientForm: false,
                displayIngredientList: true
            })
        }
    }

    render() {
        return (
            <div className='pos-container'>
                <div className='admin-header'>
                    <h1>Food Service Administration</h1>
                </div>
                <div className='admin-options'>
                    <h3>Select an option from below</h3>
                    <button className='btn' onClick={this.addNewUser}>Add New User</button>
                    <button className='btn' onClick={this.displayUsers}>Display Users</button>
                    <button className='btn' onClick={this.addNewProduct}>Add New Product</button>
                    <button className='btn' onClick={this.displayProduct}>Dislplay Products</button>
                    <button className='btn' onClick={this.addNewIngredient}>Add New Ingredient</button>
                    <button className='btn' onClick={this.displayIngredient}>Display Ingredients</button>


                </div>
                <div className='admin-view'>
                    {this.state.displayNewUserForm ?
                        <NewUserForm />
                        : this.state.displayUsersList
                            ? <UserList /> :
                            this.state.displayNewProductForm ?
                                <NewProductForm /> :
                                this.state.displayProductList ?
                                    <ProductsList /> :
                                    this.state.displayNewIngredientForm ?
                                        <NewIngredientForm /> :
                                        this.state.displayIngredientList ?
                                            <IngredientList /> :

                                            <h1>Content Here</h1>}

                </div>
            </div>
        );
    }
}

export default Admin;