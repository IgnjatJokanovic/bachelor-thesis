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

const Home = lazy(() => import("./pages/home"));
const Navbar = lazy(() => import("./components/Navbar"));




const App = () => {

	return (
		<Router>
			<Suspense fallback={"Loading.."}>
				<Navbar />
				<ScrollNav>
					<Switch>
						<Route exact path="/" component={Home} />
					</Switch>
				</ScrollNav>
			</Suspense>
		</Router >
	);
};

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"));
}
