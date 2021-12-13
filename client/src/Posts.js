import React from "react";
import { Link } from "@reach/router";
import AddPost from "./AddPost";

// Nothing special happens in this component, except for the Link
function Posts(props) {
    var { data, addPost } = props;


    function readMore(content) {

        return content.substring(0, 25);
    }

    function getUser(id) {
        const user = props.getUser(id);
        return user;
    }

    return (


        <>
            <br />
            <AddPost addPost={addPost} />
            <h1 style={{ textAlign: 'center' }}>List of all posts</h1>
            <div style={{ width: '300px', border: 'solid', margin: '0 auto', textAlign: 'center', padding: '1em' }}>

                {data.map(post => <>

                    <div>
                        <div>
                            <Link to={`/Post/${post._id}`}>Post by {post.authorName} | {post.submitter.username}</Link>
                        </div>
                        <hr />
                        <div>
                            {readMore(post.content)}...
                        </div>
                        <hr />
                        <div>
                            Likes:{post.likes} &nbsp; &nbsp; Comments: {(post.comments).length}
                        </div>
                        <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                    </div>
                </>



                )}






            </div></>

    );
}

export default Posts;
