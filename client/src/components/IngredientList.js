import React, { Component } from 'react';
import axios from 'axios'

class IngredientList extends Component {

    state = {
        ingredientList: [],
        displayEditForm: false,
        ingredient: {}
    }

    getIngredientsList = async () => {
        const res = await axios.get(`/api/v1/ingredients/`)
        
        this.setState({ ingredientList: [...res.data] })
    }

    componentDidMount() {
        this.getIngredientsList()
    }

    editIngridient = async (event) => {

        const ingredient = await axios.get(`/api/v1/ingredients/${event.target.value}/`)
        
        this.setState({ ingredient: ingredient.data, displayEditForm: true })

    }

    updateIngredient = async (event)=>{
        event.preventDefault()
        const res = await axios.put(`/api/v1/ingredients/${this.state.ingredient.id}/`, this.state.ingredient)
        
        this.setState({displayEditForm: false})
        
    }

    deleteIngredient = async (event) =>{
        event.preventDefault()
        const res = await axios.delete(`/api/v1/ingredients/${this.state.ingredient.id}/`)
        this.setState({displayEditForm: false})
        this.getIngredientsList()
    }



    handleInputChange = (event) => {
        const copiedIngredient = { ...this.state.ingredient }
        copiedIngredient[event.target.name] = event.target.value
        this.setState({ ingredient: copiedIngredient })
        
    }


    render() {
        return (
            <div>
                <h1>List of ingredients</h1>
                {this.state.displayEditForm ?
                    <div>
                        <form className='form' onSubmit={this.updateIngredient}>
                           
                                <label htmlFor='name'>Name: </label>
                                <input type='text' name='name' onChange={this.handleInputChange} value={this.state.ingredient.name}></input>
                          
                            <input type='submit' value='Submit'></input>
                        </form>
                        <form onSubmit={this.deleteIngredient}>
                            <input type='submit' value='Delete'></input>
                        </form>
                    </div>

                    : this.state.ingredientList.map(ingredient => {
                        return (
                            <p key={ingredient.id}>
                                {ingredient.name}
                                <button onClick={this.editIngridient} value={ingredient.id}>Edit</button>
                            </p>
                        )
                    })}
            </div>
        );
    }
}

export default IngredientList;