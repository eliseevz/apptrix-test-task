import React from 'react';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import {getUsers, getUsersLoadingStatus} from "../store/users";
import Table from "./table/Table";

const UsersList = () => {

    const users = useSelector(getUsers())
    const usersLoadingStatus = useSelector(getUsersLoadingStatus())
    const history = useHistory()


    const handleOpenUser = (id) => {
        history.push(`/${id}`)
    }

    if (usersLoadingStatus) {
        return <p>loading...</p>
    }
    return (
        <Table
            columns={["ID", "NAME", "LOGIN", "EMAIL"]}
            data={users}
            keyList={["id", "name", "login", "email"]}
            onClickHandler={handleOpenUser}
            role="button"
        />
    );
};

export default UsersList;
