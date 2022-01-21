import React, {useState} from 'react';
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {getAuthStatus, logout} from "../store/auth";
import {removeAuthData} from "../services/localStorageService";

const Navbar = () => {

    const [dropDown, setDropDown] = useState(false)
    const authStatus = useSelector(getAuthStatus())
    const dispatch = useDispatch()

    const handleToggleDropDown = () => {
        setDropDown(prevState => !prevState)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <ul className="nav justify-content-center p-2 bg-dark">
            <li className="nav-item">
                <Link className="nav-link text-white" to='/'>Home</Link>
            </li>
            {
                authStatus
                ? <div className="dropdown ms-5" onClick={handleToggleDropDown}>
                        <div className="btn dropdown-toggle d-flex align-items-center">
                            <div className="me-2">
                                <i className="bi bi-person-circle text-white"></i>
                            </div>
                        </div>
                        {
                            dropDown && <div className="w-100 dropdown-menu show">
                                <Link to="/" className="dropdown-item">Profile</Link>
                                <Link onClick={logoutHandler} to="/" className="dropdown-item">Logout</Link>
                            </div>
                        }
                    </div>
                : null
            }

        </ul>
    );
};

export default Navbar;
