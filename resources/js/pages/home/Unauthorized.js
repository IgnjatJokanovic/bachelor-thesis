import React from "react";
import Select from "react-select";
import {
    selectYearOptions,
    selectDayOptions,
    selectMonthOptions
} from "../../Helpers";

export default function Unauthorized() {
    console.log(selectDayOptions());

    return (
        <div className="container register-form">
            <form>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <Select
                    value={selectYearOptions()[0]}
                    options={selectYearOptions()}
                />
                <Select
                    value={selectDayOptions()[0]}
                    options={selectDayOptions()}
                />
                <Select
                    value={selectMonthOptions[0]}
                    options={selectMonthOptions}
                />
                <input type="radio" value="M" name="rbsex" />
                Male
                <input type="radio" value="F" name="rbsex" />
                Female
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
