import React from "react";
import { isAuthenticated } from "../../Helpers";
import Unauthorized from "./Unauthorized";

export default function index() {
    return <>{isAuthenticated() ? null : <Unauthorized />}</>;
}
