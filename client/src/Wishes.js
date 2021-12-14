import React from "react";
import { Link, navigate } from "@reach/router";
import jwt_decode from "jwt-decode";

// Nothing special happens in this component, except for the Link
function Wishes(props) {
    var { data } = props;

    var type = "visitor"
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
        var decoded = jwt_decode(jwtToken);
        type = decoded.user.type
    }




    return (
        <>
            <h1 style={{ textAlign: 'center' }}>List of all posts</h1>
            <div style={{ width: '300px', border: 'solid', margin: '0 auto', textAlign: 'center', padding: '1em' }}>

                {data.map(wish => <>

                    <div>
                        <div>
                            Title: <Link to={`/Wish/${wish._id}`}> {wish.title}</Link>
                        </div>
                        <hr />
                        <div>
                            Description: <strong>{wish.description}</strong>
                        </div>
                        <hr />
                        <div>
                            {type == 'admin' ? <><strong>vote:{wish.vote}</strong></> : null}
                            &nbsp; &nbsp; Comments: <strong>{(wish.comments).length}</strong>
                        </div>
                        <hr />
                        <div>
                            Creation date:  <strong>{new Intl.DateTimeFormat('en-GB', {
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                            }).format(new Date(wish.createdAt))}</strong>
                        </div>
                        <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                    </div>
                </>



                )}






            </div></>

    );
}

export default Wishes;
