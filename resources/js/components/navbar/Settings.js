import React from "react";
import { logOut } from "../../Helpers";
import axios from "axios";

export default function Settings({
    toggleNavOption,
    navOption,
    handleBlurOption
}) {
    const logout = () => {
        axios
            .post("/api/user/logout")
            .catch(err => {
                console.log(err);
            })
            .then(res => {
                logOut();
            });
    };
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i
                className="fa fa-cogs"
                aria-hidden="true"
                onClick={() => toggleNavOption(4)}
            />
            <div
                className={
                    navOption == 4
                        ? "navbar-wrapper--links--dropdown--content active"
                        : "navbar-wrapper--links--dropdown--content"
                }
                onBlur={handleBlurOption}
            >
                <p onClick={logout}>Log out</p>
            </div>
        </div>
    );
}
