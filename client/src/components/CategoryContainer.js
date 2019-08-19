import React, { Component } from 'react';

class  CategoryContainer extends Component {

    render() {
        return (
            <div className='category-container'>
                {
                    this.props.categoryTypeArray.map(category =>{
                        return (
                            <button onClick={this.props.switchCategoty} value={category}>{category}</button>
                        )
                    })
                }
            </div>
        );
    }
}

export default CategoryContainer;