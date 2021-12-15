import React, { useState } from "react";
import { navigate } from "@reach/router";
import apiService from "./apiService";

function UpdateWish(props) {

    const { setWishes } = props;
    const { wishes } = props;
    const wish = props.getWish(props.id);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newExternalLink, setNewExternalLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    async function updateWish(wishId, newTitle, newDescription, newExternalLink, setErrorMessage) {

        if (newTitle !== "") {
            setErrorMessage("")

            const wish = wishes.find((wish) => wish._id === wishId);
            var index = wishes.findIndex((wish) => wish._id === wishId);

            const updatedWish = await apiService.put(`/allWishes/updateSingleWish/${wishId}`,
                { ...wish, title: wish.title = newTitle, description: wish.description = newDescription, externalLink: wish.externalLink = newExternalLink }
            )

            setWishes([...wishes.slice(0, index), updatedWish, ...wishes.slice(index + 1)]);
            navigate("/")
            window.location.reload();
        } else {
            setErrorMessage("The title must be filled!")
        }

    }

    return (

        <>
            <div style={{ width: '500px', margin: '10px auto', textAlign: 'center', padding: '10px', fontSize: '25px' }}><strong>Update wish</strong></div>
            <div style={{ border: 'solid', width: '500px', margin: '0 auto', textAlign: 'center', padding: '1em' }}>
                {errorMessage && (<p>{errorMessage}</p>)}
                <div>
                    <p>Title:</p>
                    <input id="titleID" onChange={(event) => setNewTitle(event.target.value)} type="text" />
                    <div id="TitleId" />
                </div>
                <hr />
                <div>
                    <p>Description:</p>
                    <textarea style={{ margin: '0 auto', width: '300px', height: '50px' }} id="descriptionID" onChange={(event) => setNewDescription(event.target.value)} type="text" />
                </div>
                <hr />
                <div>
                    <p>External Link:</p>
                    <input id="extraID" onChange={(event) => setNewExternalLink(event.target.value)} type="text" />
                    <div id="ExternalLinkId" />
                </div>
                <hr />
                <div >
                    <button style={{ backgroundColor: 'green', height: '25px', borderRadius: '5px' }} type="button" onClick={(event) => {
                        updateWish(props.id, newTitle, newDescription, newExternalLink, setErrorMessage);
                    }}>Update Wish </button>
                    &nbsp;&nbsp;
                    <button class="btn" type="button" onClick={(event) => {
                        navigate('/');
                    }}>Back to home</button>
                </div>






            </div>

        </>

    );
}

export default UpdateWish;
