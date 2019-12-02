import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, validateLogin, createCookie } from "../Helpers";
import { AlertContext } from "../app";
import axios from "axios";

export default function Navbar() {
    const setAlert = React.useContext(AlertContext);
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const login = () => {
        validateLogin(user)
            .then(() => {
                axios
                    .post("/api/user/login", user)
                    .then(res => {
                        createCookie(res.data.token, 1);
                        window.location.href = "/";
                    })
                    .catch(err => {
                        setAlert(err.response.data, "error");
                    });
            })
            .catch(err => setAlert(err, "error"));
    };
    return (
        <div className="navbar-wrapper">
            <div className="navbar-wrapper--grid container">
                <div className="navbar-wrapper--logo">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="foxbook-logo"
                    />
                    {isAuthenticated() ? (
                        <div className="navbar-wrapper--logo--srch">
                            <input type="text" placeholder="Search..." />
                        </div>
                    ) : null}
                </div>
                {isAuthenticated() ? (
                    <div className="navbar-wrapper--links">
                        <Link to="/">Home</Link>
                        <div className="navbar-wrapper--links--dropdown">
                            <i className="fas fa-user-friends">
                                <span>10</span>
                            </i>
                            <div className="navbar-wrapper--links--dropdown--content"></div>
                        </div>
                        <div className="navbar-wrapper--links--dropdown">
                            <i className="fas fa-envelope-square">
                                <span>1</span>
                            </i>
                            <div className="navbar-wrapper--links--dropdown--content"></div>
                        </div>
                        <div className="navbar-wrapper--links--dropdown">
                            <i className="fas fa-bell">
                                <span>1</span>
                            </i>
                            <div className="navbar-wrapper--links--dropdown--content"></div>
                        </div>
                    </div>
                ) : (
                    <div className="login-container">
                        <input
                            onChange={e =>
                                setUser({ ...user, email: e.target.value })
                            }
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            onChange={e =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Password"
                        />
                        <button onClick={login} className="btn-green">
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
