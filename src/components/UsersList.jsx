import React from 'react';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {getUsers, getUsersLoadingStatus} from "../store/users";

const UsersList = () => {

    const users = useSelector(getUsers())
    const usersLoadingStatus = useSelector(getUsersLoadingStatus())
    const history = useHistory()

    console.log(users, ' users')

    if (usersLoadingStatus) {
        return <p>loading...</p>
    }

    const handleOpenUser = (id) => {
        history.push(`/${id}`)
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">LOGIN</th>
                <th scope="col">EMAIL</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map( user => {
                    return <tr role="button" onClick={() => handleOpenUser(user.id)} key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                    </tr>
                })
            }
            {/*<tr>*/}
            {/*    <th scope="row">1</th>*/}
            {/*    <td>Mark</td>*/}
            {/*    <td>Otto</td>*/}
            {/*    <td>@mdo</td>*/}
            {/*</tr>*/}
            </tbody>
        </table>
    );
};

export default UsersList;
