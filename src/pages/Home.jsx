import React from 'react';
import LoginForm from "../components/LoginForm";
import {useSelector} from "react-redux";
import {getAuthStatus} from "../store/auth";
import UsersList from "../components/UsersList";

const Home = () => {

    const authStatus = useSelector(getAuthStatus())

    return (
        <div className="d-flex justify-content-center mt-3">
            {
                authStatus
                ? <UsersList />
                : <LoginForm/>

            }
        </div>
    );
};

export default Home;
