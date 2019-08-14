import React, { Component } from 'react';

class Checkbox extends Component {
    render() {
        const name = this.props.ingredient
        return (
            <div>
                <label htmlFor='ingredient'>{name}</label>
                <input type='checkbox' name='ingredients' value={this.props.ingredient}></input>
            </div>
        );
    }
}

export default Checkbox;