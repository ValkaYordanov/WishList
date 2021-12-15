import React, { useState } from "react";
import { Link, navigate } from "@reach/router";

function AddWish(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { addWish } = props;

    function clearInput() {
        setTitle("");
        setDescription("");
        setExternalLink("");
    }


    return (

        <>
            <div style={{ border: 'solid', width: '500px', margin: '0 auto', textAlign: 'center', padding: '1em' }}>
                {errorMessage && (<p>{errorMessage}</p>)}
                <div>
                    <p>Title:</p>
                    <textarea maxLength='500' style={{ margin: '0 auto', width: '300px', height: '50px' }} id="contentID" onChange={(event) => setTitle(event.target.value)} type="text" />
                    <div id="TitleId" />
                </div>
                <hr />
                <div>
                    <p>Description:</p>
                    <textarea maxLength='500' style={{ margin: '0 auto', width: '300px', height: '50px' }} id="contentID" onChange={(event) => setDescription(event.target.value)} type="text" />
                    <div id="ContentId" />
                </div>
                <hr />
                <div>
                    <p>External Link:</p>
                    <input class="" id="extraId" onChange={(event) => setExternalLink(event.target.value)} type="text" />
                    <div id="AuthorNameId" />
                </div>
                <hr />
                <div >
                    <button style={{ backgroundColor: 'green', height: '25px', borderRadius: '5px' }} type="button" onClick={(event) => {

                        addWish(title, description, externalLink, setErrorMessage);
                        clearInput();
                        navigate('/');
                    }}>Add Wish </button>
                </div>






            </div>
        </>
    );
}

export default AddWish;
