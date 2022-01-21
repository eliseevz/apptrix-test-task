import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAuthStatus} from "../store/auth";
import {getUsersDataStatus, loadUsers} from "../store/users";

const AppLoader = ({children}) => {

    const authStatus = useSelector(getAuthStatus())
    const userDataLoadedStatus = useSelector(getUsersDataStatus())

    const dispatch = useDispatch()

    useEffect(() => {
        if (authStatus) {
            dispatch(loadUsers())
        }
    }, [authStatus])

    return (
        <div>
            {
                userDataLoadedStatus || !authStatus
                ? children
                : <p>loading qq</p>
            }
        </div>
    );
};

export default AppLoader;
