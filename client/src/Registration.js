import { useState } from "react";
import apiService from "./apiService";
import Logout from "./Logout";
import jwt_decode from "jwt-decode";

import { Link, navigate } from "@reach/router";

function Registration(props) {
    const { createUser } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onSubmit() {
        createUser(username, password);
        console.log(username, password);
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
    let regPart = <div> <h3>Registration</h3>

        <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            name="username"
            placeholder="username"></input>
        <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="password"
            placeholder="password"></input>

        <button type="button" onClick={() => onSubmit()}>
            Registration!
        </button></div>;
    if (apiService.loggedIn()) {
        var decoded = jwt_decode(localStorage.getItem("token"));
        console.log(decoded)
        // if (decoded.user.type == "admin") {
        //     loginPart = <div>

        //         <Logout logout={logout}></Logout>

        //         <AddWish addWish={addWish} />
        //     </div>;
        // } else {
        regPart = <div>
            <p>You are logged in as a {decoded.user.username}</p>
            <Logout logout={logout}></Logout>

        </div>;
        //}
    }

    return (
        <>
            {regPart}
        </>
    );
}

export default Registration;
