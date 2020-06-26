import React from "react";

export default function Settings({ toggleNavOption }) {
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i
                className="fa fa-cogs"
                aria-hidden="true"
                onClick={() => toggleNavOption(4)}
            />
            <div className="navbar-wrapper--links--dropdown--content" />
        </div>
    );
}
