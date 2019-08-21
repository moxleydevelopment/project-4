import React, { Component } from 'react';

class ModButtonContainer extends Component {
    render() {
        return (
            <div className='mod-button-container'>
                {
                    this.props.modificationType.map((mod, index) =>{
                        return (
                            <button className={`modbBTN ${mod}`} key={index} onClick={this.props.switchModification} value={mod}>{mod}</button>
                        )
                    })
                    
                }
            </div>
        );
    }
}

export default ModButtonContainer;