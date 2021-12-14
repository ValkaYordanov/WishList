import { useState } from "react";
import apiService from "./apiService";
import Logout from "./Logout";
import jwt_decode from "jwt-decode";
import { Link, navigate } from "@reach/router";

function Login(props) {
    const { login } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function onSubmit() {
        login(username, password);
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

    let loginPart = <div><h3>Login</h3>

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
            Login!
        </button></div>;
    if (apiService.loggedIn()) {
        var decoded = jwt_decode(localStorage.getItem("token"));
        loginPart = <div>
            <p>You are logged in as a {decoded.user.username}</p>
            <Logout logout={logout}></Logout>

        </div>;

    }
    return (
        <>
            <div style={{ border: 'solid', width: '6%' }}> <Link to="/"> Go to home</Link></div>

            {loginPart}
        </>
    );
}

export default Login;
