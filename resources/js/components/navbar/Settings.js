import React from "react";
import { logOut } from "../../Helpers";
import axios from "axios";

export default function Settings() {
    const logout = () => {
        axios
            .post("/api/user/logout")
            .catch(err => {
                console.log(err);
            })
            .then(res => {
                logOut();
            });
    };
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
            <i
                className="fa fa-cogs"
                aria-hidden="true"
                onClick={e => setOpen(!open)}
            />
            <div
                className={
                    open
                        ? "navbar-wrapper--links--dropdown--content 4 active"
                        : "navbar-wrapper--links--dropdown--content 4"
                }
            >
                <p onClick={logout}>Log out</p>
            </div>
        </div>
    );
}
