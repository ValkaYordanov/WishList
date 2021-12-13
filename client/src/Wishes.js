import React from "react";
import { Link } from "@reach/router";
import jwt_decode from "jwt-decode";

// Nothing special happens in this component, except for the Link
function Wishes(props) {
    var { data, addWish } = props;

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
                            <Link to={`/Wish/${wish._id}`}> {wish.title}</Link>
                        </div>
                        <hr />
                        <div>
                            {wish.description}
                        </div>
                        <hr />
                        <div>
                            {type == 'admin' ? <>vote:{wish.vote}</> : null}
                            &nbsp; &nbsp; Comments: {(wish.comments).length}
                        </div>
                        <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                    </div>
                </>



                )}






            </div></>

    );
}

export default Wishes;
