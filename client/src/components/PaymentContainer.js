import React, { Component } from 'react';

class PaymentContainer extends Component {
    render() {
        return (
            <div className='payment-div'>
                <div className='keypad-container'>
                    <h3>Payment Amount: {this.props.cashPayment} </h3>
                    <div className='keypad'>
                        <button onClick={this.props.getcashPayment} value='1'>1</button>
                        <button onClick={this.props.getcashPayment} value='2'>2</button>
                        <button onClick={this.props.getcashPayment} value='3'>3</button>
                        <button onClick={this.props.getcashPayment} value='4'>4</button>
                        <button onClick={this.props.getcashPayment} value='5'>5</button>
                        <button onClick={this.props.getcashPayment} value='6'>6</button>
                        <button onClick={this.props.getcashPayment} value='7'>7</button>
                        <button onClick={this.props.getcashPayment} value='8'>8</button>
                        <button onClick={this.props.getcashPayment} value='9'>9</button>
                        <button onClick={this.props.getcashPayment} value='.'>.</button>
                        <button onClick={this.props.getcashPayment} value='0'>0</button>
                        <button onClick={this.props.clearAmount}>Clear</button>
                    </div>

                </div>
                <h2>Select Payment Option</h2>

                <button className='amex'><i class="fab fa-cc-amex"></i></button>
                <button className='discover'><i class="fab fa-cc-discover"></i></button>
                <button className='mastercard'><i class="fab fa-cc-mastercard"></i></button>
                <button className='visa'><i class="fab fa-cc-visa"></i></button>


            </div>
        );
    }
}

export default PaymentContainer;