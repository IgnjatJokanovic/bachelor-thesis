import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Helpers";

export default function Navbar() {
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
                    <div className="login-container"></div>
                )}
            </div>
        </div>
    );
}
