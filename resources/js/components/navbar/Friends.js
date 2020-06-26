import React from "react";

export default function Friends({ toggleNavOption }) {
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i
                className="fas fa-user-friends"
                onClick={() => toggleNavOption(1)}
            >
                <span>10</span>
            </i>
            <div className="navbar-wrapper--links--dropdown--content" />
        </div>
    );
}
