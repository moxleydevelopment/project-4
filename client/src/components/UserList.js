import React, { Component } from 'react';
import axios from 'axios'

class UserList extends Component {

    state = {
        userList: [],
        displayEditUserForm: false,
        user: {}
    }

    getUsersList = async () => {
        const res = await axios.get(`/api/v1/users/`)
        this.setState({ userList: res.data })
    }

    editUserForm = async (event) => {
        const user = await axios.get(`/api/v1/users/${event.target.value}/`)
        this.setState({ user: user.data, displayEditUserForm: true })
    }

    handleInputChange = (event) => {
        const copiedUser = { ...this.state.user }
        copiedUser[event.target.name] = event.target.value
        this.setState({ user: copiedUser })

    }

    updateUser = async (event) => {
        event.preventDefault()
        const user = await axios.put(`/api/v1/users/${this.state.user.id}/`, this.state.user)
        this.setState({ user: user.data, displayEditUserForm: false })
        this.getUsersList()
    }

    deleteUser = async (event) => {
        event.preventDefault()
        const user = await axios.delete(`/api/v1/users/${this.state.user.id}/`)
        this.setState({ user: user.data, displayEditUserForm: false })
        this.getUsersList()
    }

    componentDidMount() {
        this.getUsersList()
    }
    render() {
        return (
            <div>
                <h1>Available Users</h1>
                {
                    this.state.displayEditUserForm ?
                        <div>
                            <form className='form' onSubmit={this.updateUser}>

                                <label htmlFor='name'>Name: </label>
                                <input type='text' name='name' onChange={this.handleInputChange} value={this.state.user.name}></input>

                                <label htmlFor='passcode'>Passcode: </label>
                                <input type='number' name='passcode' onChange={this.handleInputChange} value={this.state.user.passcode}></input>

                                <input type='submit' value='Submit'></input>
                            </form>
                            <form onSubmit={this.deleteUser}>
                                <input className="deleteBtn" type='submit' value='Delete'></input>
                            </form>
                        </div>



                        : <table className='table-user'>
                            <tr>
                                <th>User</th>
                                <th>Passcode</th>
                                <th>Select</th>
                            </tr>
                            {this.state.userList.map(user => {
                                return (
                                    <tr>
                                        <td>{user.name} </td>
                                        <td>{user.passcode}</td>
                                        <td><button onClick={this.editUserForm} value={user.id}>Edit</button></td>
                                    </tr>

                                )
                            })}
                        </table>
                }

            </div>
        );
    }
}

export default UserList;