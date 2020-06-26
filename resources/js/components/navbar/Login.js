import React from "react";
import { AlertContext } from "../../app";
import axios from "axios";
import { validateLogin, createCookie } from "../../Helpers";

export default function Login() {
    const setAlert = React.useContext(AlertContext);
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const login = () => {
        validateLogin(user)
            .then(() => {
                axios
                    .post("/api/user/login", user, {
                        headers: { Accept: "application/json" }
                    })
                    .then(res => {
                        createCookie(res.data.token, 1);
                        window.location.href = "/";
                    })
                    .catch(err => {
                        setAlert(err.response.data.messages[0], "error");
                    });
            })
            .catch(err => setAlert(err, "error"));
    };
    return (
        <div className="login-container">
            <input
                onChange={e => setUser({ ...user, email: e.target.value })}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Password"
            />
            <button onClick={login} className="btn-green">
                Login
            </button>
        </div>
    );
}
