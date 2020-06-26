import React from "react";

export default function Messages({ toggleNavOption }) {
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i
                className="fas fa-envelope-square"
                onClick={() => toggleNavOption(2)}
            >
                <span>1</span>
            </i>
            <div className="navbar-wrapper--links--dropdown--content" />
        </div>
    );
}
