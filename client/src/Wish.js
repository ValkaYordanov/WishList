import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";
import "./styles.css";
import jwt_decode from "jwt-decode";

// Nothing special happens in this component, except for the Link
function Wish(props) {


    const wish = props.getWish(props.id); // "props.id" contains the id in "/recipe/:id"

    const { incrementVote } = props;
    const { decrementVote } = props;
    const { deleteWish } = props;
    const { addComment } = props;
    const [comment, setComment] = useState("");
    const [user, setUser] = useState("");

    var type = "none"
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
        var decoded = jwt_decode(jwtToken);
        type = decoded.user.type
    }
    const [errorMessage, setErrorMessage] = useState("");

    function clearInput() {
        setComment("");
        setUser("");

    }

    if (!wish) {
        return <p>Loading...</p>
    }
    return (

        <div className="background-orange" >

            <div style={{ border: 'solid', background: 'yellow', margin: '0 auto', width: '80%', padding: '1em' }}>
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <strong> Title:</strong> {wish.title}
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }}>
                    <span size="+1"><strong>Date:</strong></span>&nbsp;&nbsp;
                    {new Intl.DateTimeFormat('en-GB', {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date(wish.createdAt))}
                    {type == 'admin' ? <><Link to="/"><button type="button" onClick={(event) => { deleteWish(wish._id); }}>Delete</button></Link></> : null}

                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <strong> Description:</strong> {wish.description}
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <span size="+1"><strong>External Link:</strong></span>&nbsp;&nbsp; {wish.externalLink}
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    {type == 'admin' ? <> <span size="+1"><strong>Vote:</strong></span>&nbsp;&nbsp;{wish.vote}
                        &nbsp;
                        <button type="button" onClick={(event) => {
                            incrementVote(wish._id);
                        }}>+</button>
                        <button type="button" onClick={(event) => {
                            decrementVote(wish._id);
                        }}>-</button>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</> : null}


                    <span size="+1"><strong>Comments:</strong></span>&nbsp;&nbsp; {(wish.comments).length}
                </div>
            </div>
            <br />
            <div style={{ border: 'solid', width: '50%', margin: '0 auto', alignContent: 'center', padding: '1em' }}>
                {type == 'admin' ? <>  <div>
                    {errorMessage && (<p>{errorMessage}</p>)}
                    <p style={{ margin: '0 auto' }}>Content:</p>
                    <textarea id="commentId" style={{ margin: '0 auto', width: '400px', height: '80px' }} onChange={(event) => setComment(event.target.value)} type="text" />
                    <div style={{ margin: '0 auto' }} id="CommentId" />
                    <button style={{ margin: '0 auto' }} type="button" onClick={(event) => {
                        console.log(comment, user)
                        addComment(wish._id, comment, setErrorMessage);
                        clearInput();
                        document.getElementById('commentId').value = null;

                    }}>Add Comment</button>
                </div></> : type == 'visitor' ? <>  <div>
                    {errorMessage && (<p>{errorMessage}</p>)}
                    <p style={{ margin: '0 auto' }}>Content:</p>
                    <textarea id="commentId" style={{ margin: '0 auto', width: '400px', height: '80px' }} onChange={(event) => setComment(event.target.value)} type="text" />
                    <div style={{ margin: '0 auto' }} id="CommentId" />
                    <button style={{ margin: '0 auto' }} type="button" onClick={(event) => {
                        console.log(comment, user)
                        addComment(wish._id, comment, setErrorMessage);
                        clearInput();
                        document.getElementById('commentId').value = null;

                    }}>Add Comment</button>
                </div></> : null}

                <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                <div style={{ textAlign: 'center' }} >
                    <h1>All Comments</h1>
                    <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                    <div style={{}}>
                        {(wish.comments).map(comment =>

                            <>
                                <strong style={{ textAlign: 'left', height: '5px' }}>{comment.submitter.username} </strong>{new Intl.DateTimeFormat('en-GB', {
                                    month: 'long',
                                    day: '2-digit',
                                    year: 'numeric',
                                }).format(new Date(comment.date))}
                                <p className="wrapContent"> {comment.content}</p>
                                <hr />
                            </>
                        )
                        }
                    </div>
                </div>




            </div>
            <div style={{ border: 'solid', width: '6%' }}> <Link to="/"> Go to home</Link></div>

        </div >
    );
}

export default Wish;
