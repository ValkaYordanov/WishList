import React, { useState } from "react";
/*
A component that can add new numbers to a sum. The component renders the following:

- The sum as a number (text) inside a <p> tag.
- An input text field (HTML form element)
- A button (HTML button element). When clicking the button, the component should add the number in the text field to the sum that is displayed.
*/

function AddPost(props) {

    const [content, setContent] = useState("");
    const [owner, setOwner] = useState("")
    const [authorName, setAuthorName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { addPost } = props;

    function clearInput() {
        setContent("");
        setOwner("");
        setAuthorName("");


    }
    return (

        <>
            <div style={{ border: 'solid', width: '500px', margin: '0 auto', textAlign: 'center', padding: '1em' }}>
                {errorMessage && (<p>{errorMessage}</p>)}
                <div>
                    <p>Content:</p>
                    <textarea maxLength='500' style={{ margin: '0 auto', width: '300px', height: '50px' }} id="contentID" onChange={(event) => setContent(event.target.value)} type="text" />
                    <div id="ContentId" />
                </div>
                <hr />
                <div>
                    <p>Owner:</p>
                    <input id="ownerID" onChange={(event) => setOwner(event.target.value)} type="text" />
                    <div id="OwnerId" />
                </div>
                <hr />
                <div>
                    <p>Author name:</p>
                    <input id="usernameID" onChange={(event) => setAuthorName(event.target.value)} type="text" />
                    <div id="AuthorNameId" />
                </div>
                <hr />
                <div >
                    <button style={{ backgroundColor: 'green', height: '25px' }} type="button" onClick={(event) => {

                        addPost(content, owner, authorName, setErrorMessage);
                        clearInput();
                        document.getElementById('contentID').value = null;
                        document.getElementById('ownerID').value = null;
                        document.getElementById('usernameID').value = null;
                    }}>Add Post </button>
                </div>






            </div>
        </>
    );
}

export default AddPost;
