import React from "react";
import { fetchUser, fetchCookie } from "../../Helpers";
import { EchoContext } from "../../app";

export default function Friends() {
    const echo = React.useContext(EchoContext);
    const refOption = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [recieved, setRecieved] = React.useState(0);
    console.log(fetchUser().id);
    const toggleNavOption = e => {
        if (refOption.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };
    React.useEffect(() => {
        echo.private(`friendship-received.${fetchUser().id}`).listen(
            "FriendRequestSent",
            e => {
                console.log(e);
            }
        );
        document.addEventListener("mousedown", toggleNavOption);

        return () => {
            document.removeEventListener("mousedown", toggleNavOption);
        };
    }, []);
    return (
        <div ref={refOption} className="navbar-wrapper--links--dropdown">
            <i className="fas fa-user-friends" onClick={e => setOpen(!open)}>
                {recieved == 0 ? null : <span>{recieved}</span>}
            </i>
            <div
                className={
                    open
                        ? "navbar-wrapper--links--dropdown--content 3 active"
                        : "navbar-wrapper--links--dropdown--content 3"
                }
            />
        </div>
    );
}
