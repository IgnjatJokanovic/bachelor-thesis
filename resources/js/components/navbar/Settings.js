import React from "react";
import { logOut, fetchUser } from "../../Helpers";
import axios from "axios";
import { Link } from "react-router-dom";

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
                        ? "navbar-wrapper--links--dropdown--content active"
                        : "navbar-wrapper--links--dropdown--content"
                }
            >
                <div className="row">
                    <div className="col-12" />
                </div>
                l<p onClick={logout}>Log out</p>
                <Link to={`/user/${fetchUser().slug}`}>
                    <div className="row">
                        <div className="col-6">
                            <img
                                src={
                                    fetchUser().profile == null
                                        ? "/img/default/default_profile.png"
                                        : fetchUser().profile
                                }
                                alt={
                                    fetchUser().name + " " + fetchUser().surname
                                }
                            />
                        </div>
                        <div className="col-6">Your pofile</div>
                    </div>{" "}
                </Link>
            </div>
        </div>
    );
}
