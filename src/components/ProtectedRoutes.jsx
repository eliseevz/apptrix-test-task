import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuthStatus} from "../store/auth";

const ProtectedRoute = ({component:Component, children, ...rest}) => {
    const loginStatus = useSelector(getAuthStatus())
    return (
        <Route {...rest} render={(props) => {
            if (!loginStatus) {
                return <Redirect to={{
                        pathname: "/",
                        state: props.location
                    }}
                />
            }
            return Component ? <Component {...props}/> : children
        }}/>
    );
};

export default ProtectedRoute;
