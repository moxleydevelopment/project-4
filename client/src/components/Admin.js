import React, { Component } from 'react';
import NewUserForm from './NewUserForm'

class Admin extends Component {

    state = {
        displayNewUserForm: false,
        displayUsersList: false,

    }

    addNewUser = () => {
        if (this.displayNewUserForm) {
            this.setState({ displayNewUserForm: false })
        } else {
            this.setState({ displayNewUserForm: true })
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
                    <button className='btn'>Display Users</button>
                    <button className='btn'>Add New Product</button>
                    <button className='btn'>Dislplay Product</button>


                </div>
                <div className='admin-view'>
                    {this.state.displayNewUserForm ?
                        <NewUserForm /> :
                        <h1>Content Here</h1>}

                </div>
            </div>
        );
    }
}

export default Admin;