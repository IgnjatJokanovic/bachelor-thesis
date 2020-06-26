import React from "react";

export default function Notifications({
    toggleNavOption,
    navOption,
    handleBlurOption
}) {
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i className="fas fa-bell" onClick={() => toggleNavOption(3)}>
                <span>1</span>
            </i>
            <div
                tabIndex={-1}
                className={
                    navOption == 3
                        ? "navbar-wrapper--links--dropdown--content active"
                        : "navbar-wrapper--links--dropdown--content"
                }
                onBlur={handleBlurOption}
            />
        </div>
    );
}
