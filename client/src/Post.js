import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";
import "./styles.css";
// Nothing special happens in this component, except for the Link
function Post(props) {


    const post = props.getPost(props.id); // "props.id" contains the id in "/recipe/:id"

    const { addLike } = props;
    const { deletePost } = props;
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

    console.log(post);
    if (!post) {
        return <p>Loading...</p>
    }
    //console.log(post);
    return (

        <div className="background-orange" >

            <div style={{ border: 'solid', background: 'yellow', margin: '0 auto', width: '80%', padding: '1em' }}>
                <div style={{ textAlign: 'center', margin: '0 auto' }}>
                    <font size="+1"><strong>Date:</strong></font>&nbsp;&nbsp;
                    {new Intl.DateTimeFormat('en-GB', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                    }).format(new Date(post.date))}
                    <Link to="/"><button type="button" onClick={(event) => { deletePost(post._id); }}>Delete</button></Link>
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    {post.content}
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <font size="+1"><strong>Owner of the quote:</strong></font>&nbsp;&nbsp; {post.owner} |{post.submitter.username}|
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <font size="+1"><strong>Author Name: </strong></font>&nbsp;&nbsp; {post.authorName}
                </div>
                <hr />
                <div style={{ textAlign: 'center', margin: '0 auto' }} className="wrapContentPost" >
                    <font size="+1"><strong>Likes:</strong></font>&nbsp;&nbsp;{post.likes}
                    &nbsp;
                    <button type="button" onClick={(event) => {
                        addLike(post._id);
                    }}>Like</button>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <font size="+1"><strong>Comments:</strong></font>&nbsp;&nbsp; {(post.comments).length}
                </div>
            </div>
            <br />
            <div style={{ border: 'solid', width: '50%', margin: '0 auto', alignContent: 'center', padding: '1em' }}>
                <div>
                    {errorMessage && (<p>{errorMessage}</p>)}
                    <p style={{ margin: '0 auto' }}>Content:</p>
                    <textarea id="commentId" style={{ margin: '0 auto', width: '400px', height: '80px' }} onChange={(event) => setComment(event.target.value)} type="text" />
                    <div style={{ margin: '0 auto' }} id="CommentId" />

                    <p style={{ margin: '0 auto' }}>Author name:</p>
                    <input id="authorNameId" style={{ margin: '0 auto', width: '250px' }} onChange={(event) => setUser(event.target.value)} type="text" />
                    <div style={{ margin: '0 auto' }} id="UserId" />

                    <button style={{ margin: '0 auto' }} type="button" onClick={(event) => {
                        console.log(comment, user)
                        addComment(post._id, comment, user, setErrorMessage);
                        clearInput();
                        document.getElementById('commentId').value = null;
                        document.getElementById('authorNameId').value = null;
                    }}>Add Comment</button>
                </div>
                <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                <div style={{ textAlign: 'center' }} >
                    <h1>All Comments</h1>
                    <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                    <div style={{}}>
                        {(post.comments).map(comment =>
                            <>
                                <h3 style={{ textAlign: 'left', height: '5px' }}>{comment.userName}</h3>
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

export default Post;
