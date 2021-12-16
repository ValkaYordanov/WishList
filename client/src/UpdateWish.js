import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import apiService from "./apiService";

function UpdateWish(props) {

    const { setWishes } = props;
    const { getWish } = props;
    const { wishes } = props;
    const { id } = props;
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newExternalLink, setNewExternalLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    var wish;
    wish = getWish(id);
    useEffect(() => setNewTitle(wish?.title), [wish?.title]);
    useEffect(() => setNewDescription(wish?.description), [wish?.description]);
    useEffect(() => setNewExternalLink(wish?.externalLink), [wish?.externalLink]);

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
            <div class="addUpdateWishTitle"><strong>Update wish</strong></div>
            <div class="addUpdateWishContainer">
                {errorMessage && (<p>{errorMessage}</p>)}
                <div>
                    <p>Title:</p>
                    <input value={newTitle} style={{ width: '50%' }} id="titleID" onChange={(event) => setNewTitle(event.target.value)} type="text" />
                    <div id="TitleId" />
                </div>
                <hr />
                <div>
                    <p>Description:</p>
                    <textarea value={newDescription} style={{ margin: '0 auto', width: '300px', height: '50px' }} id="descriptionID" onChange={(event) => setNewDescription(event.target.value)} type="text" />
                </div>
                <hr />
                <div>
                    <p>External Link:</p>
                    <input id="extraID" value={newExternalLink} style={{ width: '75%' }} onChange={(event) => setNewExternalLink(event.target.value)} type="text" />
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
