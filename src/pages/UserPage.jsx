import React from 'react';
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux";
import {getUserById, getUsersLoadingStatus} from "../store/users";
import {useHistory} from "react-router-dom"

const UserPage = () => {

    const {id} = useParams()
    const user = useSelector(getUserById(id))
    const history = useHistory()

    const usersLoadingStatus = useSelector(getUsersLoadingStatus())

    const handleBackClick = () => {
        history.push("/")
    }

    if (usersLoadingStatus) {
        return <p>loading</p>
    }

    return (
        <div>
            <button onClick={handleBackClick} className="btn btn-primary mt-3">Назад</button>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">TYPE</th>
                    <th scope="col">NAME</th>
                    <th scope="col">LOGIN</th>
                    <th scope="col">EMAIL</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.$type}</td>
                    <td>{user.name}</td>
                    <td>{user.login}</td>
                    <td>{user.email}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserPage;
