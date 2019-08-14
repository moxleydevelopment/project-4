import React, { Component } from 'react';
import axios from 'axios'

class UserList extends Component {

    state ={
        userList: []
    }

    getUsersList = async () =>{
        const res = await axios.get(`/api/v1/users/`)
        this.setState({userList: res.data})
    }

   componentDidMount(){
    this.getUsersList()
   } 
    render() {
        return (
            <div>
                <h1>Availble Users</h1>
                {
                    this.state.userList.map(user =>{
                        return (
                            <p>{user.name}          {user.passcode}</p>
                        )
                    })
                }
                
            </div>
        );
    }
}

export default UserList;