import React from 'react';
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({component:Component, children, ...rest}) => {
    const loginStatus = true
    return (
        <Route {...rest} render={(props) => {
            if (!loginStatus) {
                return <Redirect to={{
                    pathname: "/",
                    state: props.location
                }}/>
            }
            return Component ? <Component {...props}/> : children
        }}/>
    );
};

export default ProtectedRoute;
