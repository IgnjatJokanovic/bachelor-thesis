import React from "react";
import { isAuthenticated } from "../../Helpers";
import Unauthorized from "./Unauthorized";
import Authorised from "./Authorised";

export default function index() {
    return <>{isAuthenticated() ? <Authorised /> : <Unauthorized />}</>;
}
