import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";
import "./styles.css";
// Nothing special happens in this component, except for the Link
function Wish(props) {


    const wish = props.getWish(props.id); // "props.id" contains the id in "/recipe/:id"

    const { addVote } = props;
    const { deleteWish } = props;
    const { addComment } = props;
    const [comment, setComment] = useState("");
    const [user, setUser] = useState("");
    // const userr = props.getUser(post.submitter);
    // console.log(post.sumbitter);
    // console.log(post.submitter);
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
                <div style={{ textAlign: 'center', margin: '0 auto' }}>
                    <font size="+1"><strong>Date:</strong></font>&nbsp;&nbsp;
                    {new Intl.DateTimeFormat('en-GB', {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date(wish.createdAt))}

                    <Link to="/"><button type="button" onClick={(event) => { deleteWish(wish._id); }}>Delete</button></Link>
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    {wish.description}
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <font size="+1"><strong>External Link:</strong></font>&nbsp;&nbsp; {wish.externalLink}
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <font size="+1"><strong>Vote:</strong></font>&nbsp;&nbsp;{wish.vote}
                    &nbsp;
                    <button type="button" onClick={(event) => {
                        addVote(wish._id);
                    }}>Like</button>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <font size="+1"><strong>Comments:</strong></font>&nbsp;&nbsp; {(wish.comments).length}
                </div>
            </div>
            <br />
            <div style={{ border: 'solid', width: '50%', margin: '0 auto', alignContent: 'center', padding: '1em' }}>
                <div>
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
                </div>
                <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                <div style={{ textAlign: 'center' }} >
                    <h1>All Comments</h1>
                    <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                    <div style={{}}>
                        {(wish.comments).map(comment =>
                            <>
                                <h3 style={{ textAlign: 'left', height: '5px' }}>{comment.submitter.username}</h3>
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
