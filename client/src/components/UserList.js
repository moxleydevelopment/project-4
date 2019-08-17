import React, { Component } from 'react';
import axios from 'axios'

class UserList extends Component {

    state ={
        userList: [],
        displayEditUserForm: false,
        user: {}
    }

    getUsersList = async () =>{
        const res = await axios.get(`/api/v1/users/`)
        this.setState({userList: res.data})
    }

    editUserForm = async (event) =>{
        const user = await axios.get(`/api/v1/users/${event.target.value}/`)
        this.setState({user: user.data, displayEditUserForm: true })
    }

    handleInputChange = (event) => {
        const copiedUser = { ...this.state.user }
        copiedUser[event.target.name] = event.target.value
        this.setState({ user: copiedUser })
        
    }

    updateUser = async(event) =>{
        event.preventDefault()
        const user = await axios.put(`/api/v1/users/${this.state.user.id}/` ,this.state.user)
        this.setState({user: user.data, displayEditUserForm: false })
        this.getUsersList()
    }

    deleteUser = async(event) =>{
        event.preventDefault()
        const user = await axios.delete(`/api/v1/users/${this.state.user.id}/`)
        this.setState({user: user.data, displayEditUserForm: false })
        this.getUsersList()
    }

   componentDidMount(){
    this.getUsersList()
   } 
    render() {
        return (
            <div>
                <h1>Availble Users</h1>
                {
                    this.state.displayEditUserForm?
                    <div>
                        <form onSubmit={this.updateUser}>
                    <span>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' name='name' onChange={this.handleInputChange} value={this.state.user.name}></input>
                    </span>
                    <span>
                        <label htmlFor='passcode'>Passcode: </label>
                        <input type='number' name='passcode' onChange={this.handleInputChange} value={this.state.user.passcode}></input>
                    </span>
                    <input type='submit' value='Submit'></input>
                </form>
                <form onSubmit={this.deleteUser}>
                    <input type='submit' value='Delete'></input>
                </form>
                    </div>

                    
                    :this.state.userList.map(user =>{
                        return (
                            <p>{user.name}     {user.passcode}<button onClick={this.editUserForm} value={user.id}>Edit</button></p>
                        )
                    })
                }
                
            </div>
        );
    }
}

export default UserList;