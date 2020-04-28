import React from "react";
import { Link } from "react-router-dom";

export default function Search() {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    const [param, setParam] = React.useState("");

    const Search = () => {
        console.log(param);
        if (param != "") {
            axios
                .post("/api/search", { param: param })
                .then(res => {
                    setUsers(res.data);
                    console.log(isSearchOpen);
                })
                .catch(err => {
                    console.log(err.response);
                    setUsers([]);
                });
        } else {
            setIsSearchOpen(false);
        }
    };

    const HandleSearchBlur = () => {
        setIsSearchOpen(false);
        console.log("TEST");
    };

    const HandleSearchFocus = () => {
        setIsSearchOpen(true);
    };
    return (
        <div className="navbar-wrapper--logo--srch">
            <input
                onChange={e => {
                    setParam(e.target.value);
                }}
                type="text"
                placeholder="Search..."
                onKeyUp={Search}
                onFocus={HandleSearchFocus}
            />
            <div
                className={
                    isSearchOpen
                        ? "navbar-wrapper--logo--srch--dropdown"
                        : "navbar-wrapper--logo--srch--dropdown hidden"
                }
                onBlur={HandleSearchBlur}
            >
                {Object.keys(users).length && users.length
                    ? users.map((user, i) => (
                          <div
                              key={i}
                              className="navbar-wrapper--logo--srch--dropdown--item"
                          >
                              <Link key={i} to={`/user/${user.slug}`}>
                                  <img
                                      src="https://via.placeholder.com/150"
                                      alt="q"
                                  />{" "}
                                  <p>{user.name}</p>
                                  <p>{user.surname}</p>
                              </Link>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
