import React from "react";
import { Link } from "@reach/router";
import jwt_decode from "jwt-decode";

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

            <h1 style={{ textAlign: 'center' }}>List of all Wishes</h1>

            <div >
                {data.map(wish => <>
                    <div class={wish.received == false ? null : "received"}>
                        {wish.received == false ? <div style={{ marginTop: '4%', textAlign: 'center' }}>
                            <span class="title" ><Link to={`/Wish/${wish._id}`}> {wish.title}</Link></span>
                        </div>
                            :
                            <div style={{ marginTop: '4%', textAlign: 'center' }}>
                                Received&nbsp; &nbsp;<span class="title" ><Link to={`/Wish/${wish._id}`}> {wish.title}</Link></span>
                            </div>}

                        <div class="wishContainer">

                            <div >
                                <strong>{wish.description}</strong>
                            </div>
                            <hr />
                            <div style={{ textAlign: 'center' }}>
                                <a href={wish.externalLink}><strong>{wish.externalLink}</strong></a>
                            </div>


                        </div>
                        <div style={{ marginTop: '4%', width: '60%', margin: 'auto' }}>
                            <span style={{ float: 'right' }}>Creation date:  <strong>{new Intl.DateTimeFormat('en-GB', {
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                            }).format(new Date(wish.createdAt))}</strong></span>
                            <span style={{ float: 'left' }}>
                                Vote: <strong>{wish.vote}</strong> &nbsp; &nbsp; &nbsp; &nbsp;
                                Comments: <strong> {(wish.comments).length}</strong>
                            </span>
                        </div>
                    </div>
                </>
                )}
            </div></>

    );
}

export default Wishes;
