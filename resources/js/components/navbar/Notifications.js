import React from "react";

export default function Notifications() {
    const refOption = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [recieved, setRecieved] = React.useState(0);
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
                {recieved == 0 ? null : <span>10</span>}
            </i>
            <div
                className={
                    open
                        ? "navbar-wrapper--links--dropdown--content--long active"
                        : "navbar-wrapper--links--dropdown--content--long"
                }
            />
        </div>
    );
}
