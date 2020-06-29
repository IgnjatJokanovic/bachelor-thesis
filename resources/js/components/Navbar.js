import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../Helpers";

const Search = lazy(() => import("./navbar/Search"));
const Login = lazy(() => import("./navbar/Login"));
const Friends = lazy(() => import("./navbar/Friends"));
const Messages = lazy(() => import("./navbar/Messages"));
const Notifications = lazy(() => import("./navbar/Notifications"));
const Settings = lazy(() => import("./navbar/Settings"));

export default function Navbar() {
    return (
        <div className="navbar-wrapper">
            <div className="navbar-wrapper--grid container">
                <div className="navbar-wrapper--logo">
                    <img src="/img/logo/logo.png" alt="foxbook-logo" />
                    {isAuthenticated() ? <Search /> : null}
                </div>
                {isAuthenticated() ? (
                    <div className="navbar-wrapper--links">
                        <Link to="/">Home</Link>
                        <Friends />
                        <Messages />
                        <Notifications />
                        <Settings />
                    </div>
                ) : (
                    <Login />
                )}
            </div>
        </div>
    );
}
