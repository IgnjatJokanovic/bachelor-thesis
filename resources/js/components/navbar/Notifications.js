import React from "react";

export default function Notifications({ toggleNavOption }) {
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i className="fas fa-bell" onClick={() => toggleNavOption(3)}>
                <span>1</span>
            </i>
            <div className="navbar-wrapper--links--dropdown--content" />
        </div>
    );
}
