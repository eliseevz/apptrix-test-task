import React from 'react';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {getUsers, getUsersLoadingStatus} from "../store/users";
import Table from "./table/Table";

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
        <Table
            columns={["ID", "NAME", "LOGIN", "EMAIL"]}
            data={users}
            keyList={["id", "name", "login", "email", ["project", 'name']]}
            onClickHandler={handleOpenUser}
        />
    );
};

export default UsersList;
