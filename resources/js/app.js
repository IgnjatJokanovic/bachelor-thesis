/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ScrollContext as ScrollNav } from "react-router-scroll-4";
import Alert from "./components/Alert";

const Home = lazy(() => import("./pages/home"));
const Navbar = lazy(() => import("./components/Navbar"));
const AlertContext = React.createContext();

const App = () => {
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertState, setAlertState] = React.useState("");

    const setAlert = (message, state) => {
        setAlertMessage(message);
        setAlertState(state);

        setTimeout(() => {
            setAlertMessage("");
            setAlertState("");
        }, 2500);
    };

    return (
        <Router>
            <Suspense fallback={"Loading.."}>
                <Navbar />
                <Alert alertMessage={alertMessage} alertState={alertState} />
                <ScrollNav>
                    <AlertContext.Provider value={setAlert}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </AlertContext.Provider>
                </ScrollNav>
            </Suspense>
        </Router>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}

export { AlertContext };
