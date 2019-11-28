//REGEX

const reMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const reString = /^\w{3,}$/;

//FUNCTIONS

const createCookie = (cookieValue, daysToExpire) => {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie =
        "user-token=" + cookieValue + "; path=/; expires=" + date.toGMTString();
};

const logOut = () => {
    document.cookie =
        "user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
};

const fetchCookie = () => {
    let name = "user-token=";
    let allCookieArray = document.cookie.split(";");

    for (let i = 0; i < allCookieArray.length; i++) {
        let temp = allCookieArray[i].trim();

        if (temp.indexOf(name) === 0) {
            return temp.substring(name.length, temp.length);
        }
    }

    return "";
};

const isAuthenticated = () => {
    return fetchCookie("user-token").length > 0;
};

const validateLogin = user => {
    return new Promise((resolve, reject) => {
        if (user.email.length) {
            if (user.password.length) {
                return resolve();
            } else {
                reject("Password field is required");
            }
        } else {
            reject("Email field is required");
        }
    });
};

const validateRegister = user => {
    var currentDate = new Date();
    var selectedDate = new Date(
        user.year,
        user.month - 1,
        user.day,
        0,
        0,
        0,
        0
    );
    return new Promise((resolve, reject) => {
        if (user.firstName.length) {
            if (reString.test(user.firstName)) {
                if (user.lastName.length) {
                    if (reString.test(user.lastName)) {
                        if (user.email.length) {
                            if (reMail.test(user.email)) {
                                if (user.password.length) {
                                    if (user.password.length >= 6) {
                                        if (selectedDate <= currentDate) {
                                            if (user.gender != "") {
                                                return resolve();
                                            } else {
                                                return reject(
                                                    "Please select gender"
                                                );
                                            }
                                        } else {
                                            return reject(
                                                "Please Select a valid date"
                                            );
                                        }
                                    } else {
                                        return reject(
                                            "Password must be atleast 6 characters long"
                                        );
                                    }
                                } else {
                                    return reject("Password field is required");
                                }
                            } else {
                                return reject("Invalid Email format");
                            }
                        } else {
                            return reject("Email field is required");
                        }
                    } else {
                        return reject(
                            "Last name field must contain only characters and must be atleast 3 characters long"
                        );
                    }
                } else {
                    return reject("Last name field is required");
                }
            } else {
                return reject(
                    "First name field must contain only characters and must be atleast 3 characters long"
                );
            }
        } else {
            return reject("First name field is required");
        }
    });
};

const selectYearOptions = () => {
    let today = new Date();
    let yearArray = [];
    let start = today.getFullYear();
    let end = start - 99;
    for (let i = start; i >= end; i--) {
        yearArray.push({ value: i, label: i });
    }
    return yearArray;
};

const selectDayOptions = () => {
    let dayArray = [];
    for (let i = 1; i <= 31; i++) {
        dayArray.push({ value: i, label: i });
    }
    return dayArray;
};

const selectMonthOptions = [
    {
        value: 1,
        label: "Jan"
    },
    {
        value: 2,
        label: "Feb"
    },
    {
        value: 3,
        label: "Mar"
    },
    {
        value: 4,
        label: "Apr"
    },
    {
        value: 5,
        label: "May"
    },
    {
        value: 6,
        label: "Jun"
    },
    {
        value: 7,
        label: "Jul"
    },
    {
        value: 8,
        label: "Aug"
    },
    {
        value: 9,
        label: "Sep"
    },
    {
        value: 10,
        label: "Oct"
    },
    {
        value: 11,
        label: "Nov"
    },
    {
        value: 12,
        label: "Dec"
    }
];

export {
    isAuthenticated,
    validateLogin,
    validateRegister,
    fetchCookie,
    logOut,
    selectYearOptions,
    selectDayOptions,
    selectMonthOptions
};
