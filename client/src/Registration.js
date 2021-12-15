import { useState } from "react";
import apiService from "./apiService";
import Logout from "./Logout";
import jwt_decode from "jwt-decode";
import { navigate } from "@reach/router";

function Registration(props) {
    const { login } = props;
    const { users } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function onSubmit() {
        createUser(username, password, setErrorMessage);
        console.log(username, password);
    }

    async function createUser(username, password, setErrorMessage) {
        if (!users.find((user) => user.username === username)) {
            if (username !== "" && password !== "") {
                setErrorMessage("")

                try {
                    await apiService.createUser(username, password);
                    login(username, password, setErrorMessage);
                    navigate('/');
                } catch (error) {
                    console.error("Logout", error);
                }
            } else {
                setErrorMessage("Username and password need to be filled!")
                throw "Username and password need to be filled!"
            }
        } else {
            setErrorMessage("Username already exist!")
            throw "Username already exist!"
        }
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
    let regPart = <> <h3>Registration</h3>
        <div class="divForRegOrLog">
            <label for="uname"><b>Username</b></label><br></br>
            <input
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                name="username"
                placeholder=" Insert your username"></input><br></br><br></br>
            <label for="uname"><b>Password</b></label><br></br>
            <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name="password"
                placeholder="Insert your password"></input>
            <br></br>
            <button class="regOrloginBtn" type="button" onClick={() => onSubmit()}>
                Registration
            </button>
            <div>{errorMessage && (<p>{errorMessage}</p>)}</div>
        </div>
    </>;

    if (apiService.loggedIn()) {
        var decoded = jwt_decode(localStorage.getItem("token"));
        console.log(decoded)

        regPart = <div>
            <p>You are logged in as {decoded.user.username}</p>
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
