import React from "react";
import { Link, navigate } from "@reach/router";
import { useState } from "react";
import "./styles.css";
import jwt_decode from "jwt-decode";

// Nothing special happens in this component, except for the Link
function Wish(props) {


    const wish = props.getWish(props.id); // "props.id" contains the id in "/recipe/:id"

    const { incrementVote } = props;
    const { decrementVote } = props;
    const { makeReceived } = props;
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

        <div>



            <div class="singleWishContainer">

                {type == 'admin' ? <>
                    {wish.received == false ? <div>
                        <Link to="/"><button class="btnDelete" type="button" onClick={(event) => { deleteWish(wish._id); }}>Delete</button></Link>
                        &nbsp; &nbsp; &nbsp;
                        <span><strong>Vote:</strong></span>
                        <button class="votebBtn" type="button" onClick={(event) => {
                            incrementVote(wish._id);
                        }}>+</button>
                        {wish.vote}
                        <button class="votebBtn" type="button" onClick={(event) => {
                            decrementVote(wish._id);
                        }}>-</button>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <button class="receivedbBtn" type="button" onClick={(event) => {
                            makeReceived(wish._id);
                        }}>Make received</button>
                    </div> : <Link to="/"><button class="btnDelete" type="button" onClick={(event) => { deleteWish(wish._id); }}>Delete</button></Link>}
                </> : null}
                <div style={{ marginTop: '3%', textAlign: 'center', marginBottom: '4%' }}>
                    <span class="title" style={{ fontSize: '33px', textDecoration: 'underline' }} > {wish.title}</span>
                    &nbsp;&nbsp;
                    <span> {new Intl.DateTimeFormat('en-GB', {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date(wish.createdAt))}</span>  &nbsp;&nbsp;

                </div>


                <div class="wrapDescription" >
                    {wish.description}
                </div>

                <div style={{ textAlign: 'left', margin: '0 auto', marginBottom: '2%' }} >
                    <span><strong>More information here:</strong></span>&nbsp;&nbsp; <a href={wish.externalLink}><strong>{wish.externalLink}</strong></a>
                </div>
                <hr />

            </div>
            <br />
            <div class="singleWishContainer">
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <span style={{ margin: '0 auto', fontSize: '22px', fontWeight: 'bold' }}>Comments:</span>&nbsp;&nbsp; {(wish.comments).length}
                </div></div>

            {wish.received == false ? <>
                {type == 'admin' ? <>
                    <div class="addComment">
                        {errorMessage && (<p>{errorMessage}</p>)}
                        <p class="pAddComment">Add new comment:</p>
                        <textarea id="commentId" style={{ margin: '0 auto', width: '75%', height: '2%' }} onChange={(event) => setComment(event.target.value)} type="text" />
                        <div style={{ margin: '0 auto' }} id="CommentId" />
                        <button class="btn" type="button" onClick={(event) => {
                            addComment(wish._id, comment, setErrorMessage);
                            clearInput();
                            document.getElementById('commentId').value = null;

                        }}>Add Comment</button>
                    </div></> : type == 'visitor' ? <>
                        <div class="addComment">
                            {errorMessage && (<p>{errorMessage}</p>)}
                            <p class="pAddComment">Add new comment:</p>
                            <textarea id="commentId" style={{ margin: '0 auto', width: '75%', height: '2%' }} onChange={(event) => setComment(event.target.value)} type="text" />
                            <div style={{ margin: '0 auto' }} id="CommentId" />
                            <button class="btn" type="button" onClick={(event) => {
                                addComment(wish._id, comment, setErrorMessage);
                                clearInput();
                                document.getElementById('commentId').value = null;

                            }}>Add Comment</button>
                        </div></> : null}</> : null}


            <div class="commentsContainer">
                <div style={{ padding: '2px' }}>

                    <hr style={{ height: '1px', backgroundColor: '#b4d798' }}></hr>
                    <span style={{ fontSize: '30px' }}>All Comments</span>
                    <hr style={{ height: '1px', backgroundColor: '#b4d798' }}></hr>
                </div>

                <div style={{}} >

                    <div style={{}}>
                        {(wish.comments).sort((a, b) => {
                            return new Date(a.date).getTime() -
                                new Date(b.date).getTime()
                        }).map(comment =>

                            <>
                                <div style={{ padding: '6px', border: '1px solid', borderRadius: '8px', marginBottom: '10px' }}>
                                    <span style={{ textAlign: 'left', height: '5px', fontSize: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>{comment.submitter.username} </span><br></br>
                                    <span className="wrapContent"> {comment.content}</span><br></br>
                                    <span style={{ fontSize: '12px', fontStyle: 'italic' }}>
                                        {new Intl.DateTimeFormat('en-GB', {
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(comment.date))}
                                    </span>

                                </div>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
            <button class="btn" type="button" onClick={(event) => {
                navigate('/');
            }}>Back to home</button>

        </div >
    );
}

export default Wish;
