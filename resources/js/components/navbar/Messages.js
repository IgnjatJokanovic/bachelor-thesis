import React from "react";
import { fetchCookie } from "../../Helpers";

export default function Messages() {
    const refOption = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [recieved, setRecieved] = React.useState(0);
    const parseCookie = token => {
        if (!token) {
            return;
        }
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };
    const toggleNavOption = e => {
        if (refOption.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };
    React.useEffect(() => {
        document.addEventListener("mousedown", toggleNavOption);
        // console.log(parseCookie(fetchCookie()));
        return () => {
            document.removeEventListener("mousedown", toggleNavOption);
        };
    }, []);
    return (
        <div ref={refOption} className="navbar-wrapper--links--dropdown">
            <i className="fas fa-envelope-square" onClick={e => setOpen(!open)}>
                {recieved == 0 ? null : <span>10</span>}
            </i>
            <div
                className={
                    open
                        ? "navbar-wrapper--links--dropdown--content 2 active"
                        : "navbar-wrapper--links--dropdown--content 2"
                }
            />
        </div>
    );
}
