import { useState } from "react";
import apiService from "./apiService";
import Logout from "./Logout";
import jwt_decode from "jwt-decode";
import { navigate } from "@reach/router";

function Login(props) {

    const { login } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function onSubmit() {
        login(username, password, setErrorMessage);

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

    let loginPart = <> <h3>Login</h3>
        <div class="divForRegOrLog">
            <label for="uname"><b>Username</b></label><br></br>
            <input
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                name="username"
                placeholder="Enter username"></input>
            <br></br><br></br>
            <label for="psw"><b>Password</b></label><br></br>
            <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name="password"
                placeholder="Enter password"></input>
            <br></br>
            <button class="regOrloginBtn" type="button" onClick={() => onSubmit()}>
                Login
            </button>
            <div>{errorMessage && (<p>{errorMessage}</p>)}</div>
        </div></>;

    if (apiService.loggedIn()) {
        var decoded = jwt_decode(localStorage.getItem("token"));
        loginPart = <div>
            <p>You are logged in as {decoded.user.username}</p>
            <Logout logout={logout}></Logout>

        </div>;

    }
    return (
        <>
            {loginPart}
            <button class="btn" type="button" onClick={(event) => {
                navigate('/');
            }}>Back to home</button>
        </>
    );
}

export default Login;
