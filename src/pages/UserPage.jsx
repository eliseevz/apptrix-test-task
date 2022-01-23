import React from 'react';
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux";
import {getUserById, getUsersLoadingStatus} from "../store/users";
import history from "../utils/history"
import Table from "../components/table/Table";

const UserPage = () => {

    const {id} = useParams()
    const user = useSelector(getUserById(id))

    const usersLoadingStatus = useSelector(getUsersLoadingStatus())

    const handleBackClick = () => {
        history.push("/")
    }

    if (usersLoadingStatus) {
        return <p>loading</p>
    }

    return (
        user && <div>
            <button onClick={handleBackClick} className="btn btn-primary mt-3">Назад</button>
            <Table
                columns={["ID", "TYPE", "NAME", "LOGIN", "EMAIL"]}
                data={[user]}
                keyList={["id", "$type", "name", "login", "email"]}
            />
        </div>
    );
};

export default UserPage;
