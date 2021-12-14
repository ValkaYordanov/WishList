import React from "react";
import { Link } from "@reach/router";
import jwt_decode from "jwt-decode";
import apiService from "./apiService";

var type = "none"
const jwtToken = localStorage.getItem("token");

if (jwtToken) {
    var decoded = jwt_decode(jwtToken);
    type = decoded.user.type
}
var userIsLogged = false;
if (apiService.loggedIn()) {

    userIsLogged = true;
}
export default props => (
    <>
        <div style={{ margin: '100 auto', textAlign: 'left', padding: '2em' }}>
            <Link to="/">Home</Link>&nbsp;&nbsp;

            <Link to="login">Login</Link>&nbsp;&nbsp;

            {!userIsLogged ? <> <Link to="registration">Registration</Link>&nbsp;&nbsp;</> : null}

            {type == 'admin' ? <> <Link to="addWish">AddWish</Link>&nbsp;&nbsp;</> : null}
            <hr />
            {props.children}

        </div>

    </>
);
