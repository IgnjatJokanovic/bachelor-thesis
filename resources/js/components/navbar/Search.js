import React from "react";
import { Link } from "react-router-dom";

export default function Search() {
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
    const [users, setUsers] = React.useState([]);

    const [param, setParam] = React.useState("");

    const Search = () => {
        console.log(param);
        if (param != "") {
            axios
                .post("/api/search", { param: param })
                .then(res => {
                    console.log(res);
                    setOpen(true);
                    setUsers(res.data);
                })
                .catch(err => {
                    console.log(err.response);
                    setUsers([]);
                });
        } else {
            setOpen(false);
        }
    };

    return (
        <div ref={refOption} className="navbar-wrapper--logo--srch">
            <input
                onChange={e => {
                    setParam(e.target.value);
                }}
                type="text"
                placeholder="Search..."
                onKeyUp={Search}
                onClick={e => setOpen(!open)}
            />
            <div
                className={
                    open
                        ? "navbar-wrapper--logo--srch--dropdown"
                        : "navbar-wrapper--logo--srch--dropdown hidden"
                }
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
