import React, { Component } from 'react';

class NewUserForm extends Component {
    state = {
        newUser: {}
    }

    handleInputChange = (event) => {
        const copiedUser = { ...this.state.newUser }
        copiedUser[event.target.name] = event.target.value
        this.setState({ newUser: copiedUser })
    }

    render() {
        return (
            <div>
                <h1>Add Your User</h1>
                <form>
                    <span>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' onChange={this.handleInputChange} value={this.state.newUser.name}></input>
                    </span>
                    <span>
                        <label htmlFor='passcode'>Passcode:</label>
                        <input type='number' name='passcode' onChange={this.handleInputChange} value={this.state.newUser.passcode}></input>
                    </span>
                    <input type='submit' value='Submit'></input>
                </form>
            </div>
        );
    }
}

export default NewUserForm;