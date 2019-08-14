import React, { Component } from 'react';
import NewUserForm from './NewUserForm'
import UserList from './UserList'
import NewProductForm from "./NewProductForm";

class Admin extends Component {

    state = {
        displayNewUserForm: false,
        displayUsersList: false,
        displayNewProductForm: false

    }

    addNewUser = () => {
        if (this.displayNewUserForm) {
            this.setState({ displayNewUserForm: false })
        } else {
            this.setState({ displayNewUserForm: true })
        }
    }

    displayUsers = () => {
        if (this.displayUsersList) {
            this.setState({ displayUsersList: false })
        } else {
            this.setState({ displayUsersList: true })
        }
    }

    addNewProduct = () => {
        if (this.displayNewProductForm) {
            this.setState({ displayNewProductForm: false })
        } else {
            this.setState({ displayNewProductForm: true })
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
                    <button className='btn'>Dislplay Product</button>


                </div>
                <div className='admin-view'>
                    {this.state.displayNewUserForm ?
                        <NewUserForm /> 
                        :this.state.displayUsersList
                        ?<UserList/>:
                        this.state.displayNewProductForm?
                        <NewProductForm/>:

                        <h1>Content Here</h1>}

                </div>
            </div>
        );
    }
}

export default Admin;