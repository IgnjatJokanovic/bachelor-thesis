import React from "react";

export default function Notifications() {
    const refOption = React.useRef();
    const [open, setOpen] = React.useState(false);
    const toggleNavOption = e => {
        if (refOption.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };
    React.useEffect(() => {
        document.addEventListener("mousedown", toggleNavOption);

        return () => {
            document.removeEventListener("mousedown", toggleNavOption);
        };
    }, []);
    return (
        <div ref={refOption} className="navbar-wrapper--links--dropdown">
            <i className="fas fa-bell" onClick={e => setOpen(!open)}>
                <span>1</span>
            </i>
            <div
                className={
                    open
                        ? "navbar-wrapper--links--dropdown--content 1 active"
                        : "navbar-wrapper--links--dropdown--content 1"
                }
            />
        </div>
    );
}
