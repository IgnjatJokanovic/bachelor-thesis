//REGEX

const reMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const reString = /^([A-Z][a-z]){3,}$/;

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
    return new Promise((resolve, reject) => {
        if (user.firstName.length) {
            if (reString.test(user.firstName)) {
                if (user.lastName.length) {
                    if (reString.test(user.lastName)) {
                        if (user.email.length) {
                            if (reMail.test(user.email)) {
                                if (user.password.length) {
                                    if (user.password.length >= 6) {
                                        return resolve();
                                    } else {
                                        reject(
                                            "Password must be atleast 6 characters long"
                                        );
                                    }
                                } else {
                                    reject("Password field is required");
                                }
                            } else {
                                reject("Invalid Email format");
                            }
                        } else {
                            reject("Email field is required");
                        }
                    } else {
                        reject(
                            "Last name field must contain only characters and must be atleast 3 characters long"
                        );
                    }
                } else {
                    reject("Last name field is required");
                }
            } else {
                reject(
                    "First name field must contain only characters and must be atleast 3 characters long"
                );
            }
        } else {
            reject("First name field is required");
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
        value: "Jan",
        label: "Jan"
    },
    {
        value: "Feb",
        label: "Feb"
    },
    {
        value: "Mar",
        label: "Mar"
    },
    {
        value: "Apr",
        label: "Apr"
    },
    {
        value: "May",
        label: "May"
    },
    {
        value: "Jun",
        label: "Jun"
    },
    {
        value: "Jul",
        label: "Jul"
    },
    {
        value: "Aug",
        label: "Aug"
    },
    {
        value: "Sep",
        label: "Sep"
    },
    {
        value: "Oct",
        label: "Oct"
    },
    {
        value: "Nov",
        label: "Nov"
    },
    {
        value: "Dec",
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
