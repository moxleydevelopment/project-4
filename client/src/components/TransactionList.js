import React, { Component } from 'react';
import axios from 'axios'

class TransactionList extends Component {

    state ={
        transactionList : [],
        transactionId : 0
    }

    getTransactions = async () => {
        const res = await axios.get(`/api/v1/transactions/`)
        this.setState({transactionList: res.data})


    }

   

    deleteTransaction = async (event) =>{
        event.preventDefault()
        let transId = event.target.value
        console.log(event.target.value)
        const res = await axios.delete(`/api/v1/transactions/${transId}/`)
        console.log(res.data)
        this.getTransactions()
        

    }

    componentDidMount(){
        this.getTransactions()
    }
    render() {
        return (
            <div>
                {
                    this.state.transactionList.map(transaction =>{
                        return (
                            <div key={transaction.id}>
                                <p>Transaction ID: {transaction.id}<button onClick={this.deleteTransaction} value={transaction.id}>Delete</button></p>
                            </div>
                            
                        )
                    })
                }
            </div>
        );
    }
}

export default TransactionList;