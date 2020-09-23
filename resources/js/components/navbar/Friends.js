import React from "react";
import { fetchUser, fetchCookie } from "../../Helpers";
import { EchoContext } from "../../app";
import axios from "axios";
import FriendNode from "./FriendNode";

export default function Friends() {
    const echo = React.useContext(EchoContext);
    const refOption = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [recieved, setRecieved] = React.useState(0);
    const [recievedFriends, setRecievedFriends] = React.useState([]);
    const toggleNavOption = e => {
        if (refOption.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };

    const accept = id => {
        // axios
        //     .post()
        //     .catch(err => console.log(err))
        //     .then(res => console.log(res));
    };
    const decline = id => {
        // axios
        //     .post()
        //     .catch(err => console.log(err))
        //     .then(res => console.log(res));
    };
    React.useEffect(() => {
        echo.private(`friendship-received.${fetchUser().id}`).listen(
            "FriendRequestSent",
            e => {
                console.log(e);
                recievedFriends.unshift(e.user.from);
                setRecieved(recieved + 1);
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
                        ? "navbar-wrapper--links--dropdown--content--long active"
                        : "navbar-wrapper--links--dropdown--content--long"
                }
            >
                {recievedFriends.length
                    ? recievedFriends.map((item, index) => (
                          <FriendNode
                              src={item.profile}
                              name={item.name}
                              surname={item.surname}
                              slug={item.slug}
                              accept={accept(item.id)}
                              decline={decline(item.id)}
                              key={index}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
}
