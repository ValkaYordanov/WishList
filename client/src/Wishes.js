import React from "react";
import { Link } from "@reach/router";
import AddWish from "./AddWish";
import jwt_decode from "jwt-decode";

// Nothing special happens in this component, except for the Link
function Wishes(props) {
    var { data, addWish } = props;


    function checkUserType() {
        var decoded = jwt_decode(localStorage.getItem("token"));
        console.log(decoded)
        if (decoded != null && decoded.user.type == "admin") {
            return true;
        } else {
            return false;
        }

    }



    return (


        <>
            <br />

            <AddWish addWish={addWish} />


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
                            vote:{wish.vote} &nbsp; &nbsp; Comments: {(wish.comments).length}
                        </div>
                        <hr style={{ height: '2px', backgroundColor: 'blue' }} />
                    </div>
                </>



                )}






            </div></>

    );
}

export default Wishes;
