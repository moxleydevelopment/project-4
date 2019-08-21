import React, { Component } from 'react';
import axios from 'axios'

class NewIngredientForm extends Component {
    state = {
        newIngredient: {}
    }

    addNewIngredient = async (event) => {
        event.preventDefault()
        const res = await axios.post(`/api/v1/ingredients/`, this.state.newIngredient)
        console.log(res.data)

    }

    handleInputChange = (event) => {
        const copiedIngredient = { ...this.state.newIngredient }
        copiedIngredient[event.target.name] = event.target.value
        this.setState({ newIngredient: copiedIngredient })

    }
    render() {
        return (
            <div>
                <h1>Add Your New ingredient</h1>
                <form className='form' onSubmit={this.addNewIngredient}>
                   
                        <label htmlFor='name'>Name: </label>
                        <input type='text' name='name' onChange={this.handleInputChange} value={this.state.newIngredient.name}></input>
                 
                    <input type='submit' value='Submit'></input>
                </form>

            </div>
        );
    }
}

export default NewIngredientForm;