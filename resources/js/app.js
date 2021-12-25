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
import { isAuthenticated } from "./Helpers";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { fetchCookie } from "./Helpers";
import axios from "axios";


const Home = lazy(() => import("./pages/home"));
const Navbar = lazy(() => import("./components/Navbar"));
const User = lazy(() => import("./pages/user"));
const ImageModal = lazy(() => import("./components/ImageModal"));

//CONTEXT
const AlertContext = React.createContext();
const EchoContext = React.createContext();
const ImageContext = React.createContext();
const EmojiContext = React.createContext();

const App = () => {
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertState, setAlertState] = React.useState("");
    const [echo, setEcho] = React.useState();
    const [imgObj, setImgObj] = React.useState({
        src: "",
        open: false
    });

    const [emojiList, setEmojiList] = React.useState([]);
    const [emotions, setEmotions] = React.useState([]);

    const refImg = React.useRef();

    const toggleModal = e => {
        if (refImg.current.contains(e.target)) {
            return;
        }
        setImgObj({ ...imgObj, open: false});
    };

    const toggleImage = () => {
        setImgObj({ ...imgObj, open: !imgObj.open});
    }

    React.useEffect(() => {
        if (isAuthenticated()) {
            setEcho(
                new Echo({
                    broadcaster: "pusher",
                    key: "f5c1bddb4e7b04aba47b",
                    cluster: "eu",
                    encrypted: true,
                    auth: {
                        headers: {
                            Accept: "application/json",
                            Authorization: "Bearer " + fetchCookie(),
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                .getAttribute("content")
                        }
                    }
                })
            );

            axios.get('/api/emojiList')
                    .then(res => {
                        console.log(res.data);
                        setEmojiList(res.data);
                        var x = res.data.filter(item => item.type === "emotion");
                        // console.log("x", x);
                        setEmotions(x);
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }
        document.addEventListener("mousedown", toggleModal);

        return () => {
            document.removeEventListener("mousedown", toggleModal);
        };
    }, []);

    const imagePreview = (src) => {
        setImgObj({
            src: src,
            open: true
        });
    }

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
                <Alert alertMessage={alertMessage} alertState={alertState} />

                <AlertContext.Provider value={setAlert}>
                    <EchoContext.Provider value={echo}>
                        <ImageContext.Provider value={imagePreview}>
                            <EmojiContext.Provider value={{emojiList, emotions}}>
                                <Navbar />
                                <ScrollNav>
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route
                                            exact
                                            path="/user/:slug"
                                            component={User}
                                        />
                                    </Switch>
                                </ScrollNav>
                                <ImageModal open={imgObj.open} src={imgObj.src} togleFun={toggleImage} refImg={refImg}/>
                            </EmojiContext.Provider>
                        </ImageContext.Provider>
                    </EchoContext.Provider>
                </AlertContext.Provider>

            </Suspense>
        </Router>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}

export { AlertContext, EchoContext, ImageContext, EmojiContext };
