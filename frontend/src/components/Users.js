import React from 'react'


const UserItem = ({user}) => {
    return (
        <tbody>
            <tr>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
            </tr>
        </tbody>
    )
}


const UserList = ({users}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </tbody>
            {users.map((user) => <UserItem key={user.username.toString()} user={user} />)}
        </table>
    )
}


export default UserList