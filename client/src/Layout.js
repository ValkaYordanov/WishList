import React from "react";
import { Link, navigate } from "@reach/router";
import jwt_decode from "jwt-decode";
import apiService from "./apiService";
import Logout from "./Logout";

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

function logout() {
    try {
        apiService.logout();
        navigate('/');
        window.location.reload();
    } catch (error) {
        console.error("Logout", error);
    }
}

let welcomePart = <></>;
if (apiService.loggedIn()) {
    var decoded = jwt_decode(localStorage.getItem("token"));
    welcomePart = <> Welcome, {decoded.user.username}&nbsp;&nbsp;
        <Logout logout={logout}></Logout></>
}

export default props => (
    <>
        <div style={{ margin: '100 auto', padding: '2em' }}>

            {welcomePart}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/">Home</Link>&nbsp;&nbsp;

            <Link to="login">Login</Link>&nbsp;&nbsp;

            {!userIsLogged ? <> <Link to="registration">Registration</Link>&nbsp;&nbsp;</> : null}

            {type == 'admin' ? <> <Link to="addWish">AddWish</Link>&nbsp;&nbsp;</> : null}
            <hr />
            {props.children}

        </div>

    </>
);
