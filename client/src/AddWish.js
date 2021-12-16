import React, { useState } from "react";
import apiService from "./apiService";
import { navigate } from "@reach/router";

function AddWish(props) {

    const { setWishes } = props;
    const { wishes } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function addWish(title, description, externalLink, setErrorMessage) {

        if (title !== "") {
            setErrorMessage("")

            const newWish = {
                title: title,
                description: description,
                externalLink: externalLink,
                vote: 0,
                received: false,
                comments: [],
            };

            const resWish = await apiService.post(`/allWishes/create`,
                newWish,
            )
            setWishes([...wishes, resWish]);
            navigate("/")
            window.location.reload();
        }
        else {
            setErrorMessage("The title needs to be filled!")
        }
    }

    return (

        <>
            <div class="addUpdateWishTitle"><strong>Add new wish</strong></div>
            <div class="addUpdateWishContainer">
                {errorMessage && (<p>{errorMessage}</p>)}
                <div>
                    <p>Title:</p>
                    <input style={{ width: '50%' }} id="titleID" onChange={(event) => setTitle(event.target.value)} type="text" />
                    <div id="TitleId" />
                </div>
                <hr />
                <div>
                    <p>Description:</p>
                    <textarea id="descriptionID" style={{ width: '70%' }} onChange={(event) => setDescription(event.target.value)} type="text" />
                    <div id="DescriptionId" />
                </div>
                <hr />
                <div>
                    <p>External Link:</p>
                    <input style={{ width: '75%', }} id="externalLinkId" onChange={(event) => setExternalLink(event.target.value)} type="text" />
                    <div id="ExternalLinkId" />
                </div>
                <hr />
                <div >
                    <button style={{ backgroundColor: 'green', height: '25px', borderRadius: '5px' }} type="button" onClick={(event) => {
                        addWish(title, description, externalLink, setErrorMessage);
                    }}>Add Wish </button>
                </div>

                <button class="btn" type="button" onClick={(event) => {
                    navigate('/');
                }}>Back to home</button>

            </div>
        </>
    );
}

export default AddWish;
