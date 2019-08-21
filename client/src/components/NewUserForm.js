import React, { Component } from 'react';
import axios from 'axios'

class NewUserForm extends Component {
    state = {
        newUser: {}
    }


    addNewUser = async (event) => {
        event.preventDefault()
        const res = await axios.post(`api/v1/users/`, this.state.newUser)
        console.log(res.data)

    }

    handleInputChange = (event) => {
        const copiedUser = { ...this.state.newUser }
        copiedUser[event.target.name] = event.target.value
        this.setState({ newUser: copiedUser })

    }

    render() {
        return (
            <div >
                <h1>Add Your User</h1>
                <form className='form' onSubmit={this.addNewUser}>
                   
                        <label htmlFor='name'>Name: </label>
                        <input type='text' name='name' onChange={this.handleInputChange} value={this.state.newUser.name}></input>
                   
                        <label htmlFor='passcode'>Passcode: </label>
                        <input type='number' name='passcode' onChange={this.handleInputChange} value={this.state.newUser.passcode}></input>
                    
                    <input type='submit' value='Submit'></input>
                </form>
            </div>
        );
    }
}

export default NewUserForm;