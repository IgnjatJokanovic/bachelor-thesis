import React from "react";

export default function Messages({
    toggleNavOption,
    navOption,
    handleBlurOption
}) {
    return (
        <div className="navbar-wrapper--links--dropdown">
            <i
                className="fas fa-envelope-square"
                onClick={() => toggleNavOption(2)}
            >
                <span>1</span>
            </i>
            <div
                className={
                    navOption == 2
                        ? "navbar-wrapper--links--dropdown--content active"
                        : "navbar-wrapper--links--dropdown--content"
                }
                onBlur={handleBlurOption}
            />
        </div>
    );
}
