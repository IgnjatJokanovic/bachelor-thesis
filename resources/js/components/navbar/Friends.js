import React from "react";

export default function Friends({
    toggleNavOption,
    navOption,
    handleBlurOption
}) {
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i
                className="fas fa-user-friends"
                onClick={() => toggleNavOption(1)}
            >
                <span>10</span>
            </i>
            <div
                className={
                    navOption == 1
                        ? "navbar-wrapper--links--dropdown--content active"
                        : "navbar-wrapper--links--dropdown--content"
                }
                onBlur={handleBlurOption}
            />
        </div>
    );
}
