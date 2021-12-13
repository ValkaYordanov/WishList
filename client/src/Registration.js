import { useState } from "react";

function Registration(props) {
    const { createUser } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onSubmit() {
        createUser(username, password);
        console.log(username, password);
    }

    return (
        <>
            <h3>Registration</h3>

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
            </button>
        </>
    );
}

export default Registration;
