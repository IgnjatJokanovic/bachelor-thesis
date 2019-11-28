import React from "react";
import Select from "react-select";
import {
    selectYearOptions,
    selectDayOptions,
    selectMonthOptions,
    validateRegister
} from "../../Helpers";
import { AlertContext } from "../../app";

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
                alert("CAO");
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
            <form
                onSubmit={e => {
                    e.preventDefault();
                    register();
                }}
            >
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
                <Select
                    onChange={handleYear}
                    value={selectYear}
                    options={selectYearOptions()}
                />
                <Select
                    onChange={handleDay}
                    value={selectDay}
                    options={selectDayOptions()}
                />
                <Select
                    onChange={handleMonth}
                    value={selectMonth}
                    options={selectMonthOptions}
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
