import React from "react";
import Select from "react-select";
import {
    selectYearOptions,
    selectDayOptions,
    selectMonthOptions,
    validateRegister
} from "../../Helpers";
import { AlertContext } from "../../app";
import axios from "axios";

export default function Unauthorized() {
    const setAlert = React.useContext(AlertContext);

    const [registerUser, setRegisterUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        day: 0,
        month: 0,
        year: 0
    });

    const [selectDay, setSelectDay] = React.useState({});
    const [selectMonth, setSelectMonth] = React.useState({});
    const [selectYear, setSelectYear] = React.useState({});

    React.useEffect(() => {
        var d = selectDayOptions()[0];
        var m = selectMonthOptions[0];
        var y = selectYearOptions()[0];
        setSelectDay({
            label: d.label,
            value: d.value
        });
        setSelectMonth({
            label: m.label,
            value: m.value
        });
        setSelectYear({
            label: y.label,
            value: y.value
        });
        setRegisterUser({
            ...registerUser,
            day: d.value,
            month: m.value,
            year: y.value
        });
    }, []);

    const register = () => {
        validateRegister(registerUser)
            .then(() => {
                axios
                    .post("/api/user/register", registerUser)
                    .then(res => {
                        setAlert(res.data, "success");
                    })
                    .catch(err => {
                        setAlert(err.response.data.messages[0], "error");
                    });
            })
            .catch(err => setAlert(err, "error"));
    };

    const handleDay = value => {
        setSelectDay(value);
        setRegisterUser({ ...registerUser, day: value.value });
    };

    const handleMonth = value => {
        setSelectMonth(value);
        setRegisterUser({ ...registerUser, month: value.value });
    };
    const handleYear = value => {
        setSelectYear(value);
        setRegisterUser({ ...registerUser, year: value.value });
    };

    return (
        <div className="container register-form">
            <h1>Sign up</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    register();
                }}
            >
                <div className="register-form--grid">
                    <input
                        onChange={e =>
                            setRegisterUser({
                                ...registerUser,
                                firstName: e.target.value
                            })
                        }
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        onChange={e =>
                            setRegisterUser({
                                ...registerUser,
                                lastName: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Last Name"
                    />
                </div>
                <div className="register-form--grid">
                    <input
                        onChange={e =>
                            setRegisterUser({
                                ...registerUser,
                                email: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        onChange={e =>
                            setRegisterUser({
                                ...registerUser,
                                password: e.target.value
                            })
                        }
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="select-grid">
                    <div className="select-grid--item">
                        <Select
                            onChange={handleDay}
                            value={selectDay}
                            options={selectDayOptions()}
                        />
                    </div>
                    <div className="select-grid--item">
                        <Select
                            onChange={handleMonth}
                            value={selectMonth}
                            options={selectMonthOptions}
                        />
                    </div>
                    <div className="select-grid--item">
                        <Select
                            onChange={handleYear}
                            value={selectYear}
                            options={selectYearOptions()}
                        />
                    </div>
                </div>
                <div className="radio-container">
                    <input
                        onChange={e =>
                            setRegisterUser({
                                ...registerUser,
                                gender: e.target.value
                            })
                        }
                        type="radio"
                        value="M"
                        name="rbsex"
                    />
                    Male
                    <input
                        onChange={e =>
                            setRegisterUser({
                                ...registerUser,
                                gender: e.target.value
                            })
                        }
                        type="radio"
                        value="F"
                        name="rbsex"
                    />
                    Female
                </div>
                <button className="btn-register">Register</button>
            </form>
        </div>
    );
}
