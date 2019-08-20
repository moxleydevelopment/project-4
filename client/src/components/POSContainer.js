import React, { Component } from 'react';
import TransactionDisplay from './TransactionDisplay'
import CategoryContainer from './CategoryContainer'
import ProductContainer from './ProductContainer'
import ModButtonContainer from './ModButtonContainer'
import PaymentContainer from './PaymentContainer'
import ModificationContainer from './ModificationContainer'
import axios from 'axios'


class POSContainer extends Component {
    state = {
        userID : {},
        transactionObjet :{},
        productsAddedToTransaction: [],
        productList: [],
        categoryTypeArray: [
            "appetizers",
            'entrees',
            'sides',
            'desserts',
            'beverage',
            'cocktail',

        ],
        filteredProductList: [],
        modificationType: [
            'Home',
            'Repeat',
            'Delete',
            'Modify',
            'Payment'
        ],
        displayModificationScreen: false,
        displayPaymentScreen: false,
        selectedItem: {},
        selectedItemIndex: -1

    }
    getProductList = async () => {
        const res = await axios.get(`/api/v1/products/`)
        this.setState({ productList: res.data })
        let filteredProductList = this.state.productList.filter(product => {
            return (product.category == "appetizers")
        })
        this.setState({ filteredProductList: filteredProductList })

    }

    getUser = async () =>{
        const user = await axios.get(`/api/v1/users/2/`)
        this.setState({userID : {...user.data}})
    }

    createTransaction = async () => {
        const res = await axios.post(`/api/v1/transactions/`, this.state.transactionObjet)
        console.log(res)


    }


    componentDidMount() {
        this.getProductList()
        this.getUser()
    }



    switchCategoty = (event) => {
        let filteredProductList = this.state.productList.filter(product => {
            return (product.category == event.target.value)
        })

        this.setState({ filteredProductList: filteredProductList })
    }

    addProductToTransaction = (event) => {
        let copiedProductsAddedToTransaction = [...this.state.productsAddedToTransaction]
        let productMatch = this.state.productList.filter(item => {
            return (item.id == event.target.value)
        })
        let product = productMatch[0]
        copiedProductsAddedToTransaction.push(product)
        console.log(product)
        this.setState({ productsAddedToTransaction: copiedProductsAddedToTransaction })

    }

    switchModification = (event) => {
        switch (event.target.value) {
            case 'Home':
                this.goToHomeScreen()
                break;
            case 'Repeat':
                this.repeatSelectedItem()
                break;
            case 'Delete':
                this.deleteSelectedItem()
                break;
            case 'Modify':
                this.getModifyScreen()
                break;
            case 'Payment':
                this.getPaymentScreen()
                break;





        }
    }

    goToHomeScreen = () => {

    }

    repeatSelectedItem = () => {
        let copiedList = [...this.state.productsAddedToTransaction]
        copiedList.push(this.state.selectedItem)
        this.setState({ productsAddedToTransaction: copiedList })



    }

    deleteSelectedItem = () => {
        let copiedList = [...this.state.productsAddedToTransaction]
        if (this.state.selectedItemIndex !== -1) {
            copiedList.splice(this.state.selectedItemIndex, 1)
            this.setState({ productsAddedToTransaction: copiedList, selectedItemIndex: -1 })
        }
    }

    getModifyScreen = () => {
        this.setState({displayModificationScreen : true})
    }

    totalWithTax = () =>{
        let getSum = (total, num) => {
            return total + Number(num.price);
          }
          let subTotal = this.state.productsAddedToTransaction.reduce(getSum, 0)
           return((subTotal + (subTotal * .07)))
    }

    getPaymentScreen = () => {
        let tempTransaction = {...this.state.transactionObjet}
        tempTransaction['total'] = this.totalWithTax()
        tempTransaction['product_list'] = [...this.state.productsAddedToTransaction]
        tempTransaction['user_name'] = [this.state.userID.id]
        this.setState({getPaymentScreen : true , transactionObjet:{...tempTransaction}})
        this.createTransaction()
        


    }

    selectItem = (event) => {
        let item = {}
        item = { ...this.state.productsAddedToTransaction[event.target.value] }
        this.setState({ selectedItem: item, selectedItemIndex: event.target.value })

    }

    

   

   

    
    render() {
        return (
            <div className='pos-container'>
                <TransactionDisplay
                    productsAddedToTransaction={this.state.productsAddedToTransaction}
                    selectItem={this.selectItem}
                    userID={this.state.userID}
                    calculateSubTotal={this.calculateSubTotal}
                ></TransactionDisplay>
                <CategoryContainer
                    categoryTypeArray={this.state.categoryTypeArray}
                    switchCategoty={this.switchCategoty}
                ></CategoryContainer>
                {
                    this.state.getPaymentScreen?
                    <PaymentContainer/>:
                    this.state.displayModificationScreen?
                    <ModificationContainer/>:
                    <ProductContainer
                    productList={this.state.filteredProductList}
                    addProductToTransaction={this.addProductToTransaction}
                ></ProductContainer>
                }
                
                <ModButtonContainer
                    modificationType={this.state.modificationType}
                    switchModification={this.switchModification}
                ></ModButtonContainer>


            </div>
        );
    }
}

export default POSContainer;