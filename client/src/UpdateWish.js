import React, { useState } from "react";
import { navigate } from "@reach/router";

function UpdateWish(props) {

    const wish = props.getWish(props.id);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newExternalLink, setNewExternalLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { updateWish } = props;


    function clearInput() {
        setNewTitle("");
        setNewDescription("");
        setNewExternalLink("");
    }


    return (

        <>
            <div style={{ width: '500px', margin: '10px auto', textAlign: 'center', padding: '10px', fontSize: '25px' }}><strong>Update wish</strong></div>
            <div style={{ border: 'solid', width: '500px', margin: '0 auto', textAlign: 'center', padding: '1em' }}>
                {errorMessage && (<p>{errorMessage}</p>)}
                <div>
                    <p>Title:</p>
                    <input placeholder={wish.title} id="titleID" onChange={(event) => setNewTitle(event.target.value)} type="text" />
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
                        clearInput();

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
