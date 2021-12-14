import "./styles.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Wishes from "./Wishes";
import AddWish from "./AddWish";
import Wish from "./Wish";
import apiService from "./apiService";
import Layout from "./Layout";
import Login from "./Login";
import Logout from "./Logout";
import Registration from "./Registration";
import jwt_decode from "jwt-decode";

const API_URL = process.env.REACT_APP_API;
export default function App() {
  const [wishes, setWishes] = useState([]);
  const [users, setUsers] = useState([]);


  async function getData() {
    try {
      const data = await apiService.getWishes();

      setWishes(data);
      getUsersData();
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsersData() {
    try {
      const dataa = await apiService.getUsers();
      setUsers(dataa);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getWish = (id) => {
    return wishes.find((wish) => wish._id === id);
  };

  const getUser = (id) => {
    return users.find((user) => user._id === id);
  };






  async function login(username, password, setErrorMessage) {
    if (username !== "" && password !== "") {
      setErrorMessage("")

      try {
        await apiService.login(username, password);
        getData();
        window.location.reload();
      } catch (error) {
        setErrorMessage("Passowrd mistmatch or there is no user with this username!")
        console.error("Passowrd mistmatch or there is no user with this username!", error);
      }
    } else {
      setErrorMessage("Username and password need to be filled!")
      throw "Username and password need to be filled!"
    }
  }

  function logout() {
    try {
      apiService.logout();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Logout", error);
    }
  }

  async function addWish(title, description, externalLink, setErrorMessage) {

    if (title !== "") {
      setErrorMessage("")
      if (apiService.loggedIn()) {

      } else {
        setErrorMessage("You have to login in orfer to create a wish!")
        throw "You have to log in!"
      }


      const newWish = {
        title: title,
        description: description,
        externalLink: externalLink,
        vote: 0,
        comments: [],
      };

      console.log(newWish);
      const resWish = await apiService.post(`/allWishes/create`,
        newWish,
      )
      setWishes([...wishes, resWish]);
      window.location.reload();
    }
    else {
      setErrorMessage("The title needs to be filled!")
    }
  }


  async function incrementVote(wishId) {
    const wish = wishes.find((wish) => wish._id === wishId);
    var index = wishes.findIndex((wish) => wish._id === wishId);
    const updatedWish = await apiService.put(`/allWishes/incrementVote/${wishId}`,

      { ...wish, vote: wish.vote + 1 },
    )

    setWishes([...wishes.slice(0, index), updatedWish, ...wishes.slice(index + 1)]);
    getData()

  }

  async function decrementVote(wishId) {
    const wish = wishes.find((wish) => wish._id === wishId);
    var index = wishes.findIndex((wish) => wish._id === wishId);
    const updatedWish = await apiService.put(`/allWishes/decrementVote/${wishId}`,

      { ...wish, vote: wish.vote - 1 },
    )

    setWishes([...wishes.slice(0, index), updatedWish, ...wishes.slice(index + 1)]);
    getData()

  }

  async function deleteWish(wishId) {

    const wishes = await apiService.delete(`/allWishes/deleteWish/${wishId}`,

    )
    window.location.reload();
    setWishes(wishes);
  }


  async function addComment(wishId, comment, setErrorMessage) {
    if (comment !== "" && apiService.loggedIn()) {
      setErrorMessage("")


      var decoded = jwt_decode(localStorage.getItem("token"));

      var index = wishes.findIndex((wish) => wish._id === wishId);

      const newComment = { submitter: decoded.user, content: comment, date: Date.now() };

      const data = await apiService.put(`/allWishes/addComment/${wishId}`,
        newComment,
      )

      setWishes([...wishes.slice(0, index), data, ...wishes.slice(index + 1)]);
      getData()

    }
    else {
      setErrorMessage("The comment needs to be filled and you have to be logged in!")
    }
  }

  // let contents =
  //   <>
  //     <p>No Wishs!</p>
  //     <Router>
  //       <Wish path="/Wish/:id" getWish={getWish} incrementVote={incrementVote} decrementVote={decrementVote} addComment={addComment} getUser={getUser} deleteWish={deleteWish}></Wish>
  //       <Wishes path="/" data={wishes} addWish={addWish} getUser={getUser}></Wishes>


  //     </Router>
  //   </>
  //   ;
  // if (wishes.length > 0) {
  //   contents = (
  //     <Router>
  //       <AddWish path="/addWish" addWish={addWish} />

  //       <Wish path="/Wish/:id" getWish={getWish} incrementVote={incrementVote} decrementVote={decrementVote} addComment={addComment} getUser={getUser} deleteWish={deleteWish}></Wish>
  //       <Wishes path="/" data={wishes} addWish={addWish} getUser={getUser}></Wishes>


  //     </Router>
  //   );
  // }

  // let regPart = <Registration createUser={createUser}></Registration>;
  // if (apiService.loggedIn()) {
  //   var decoded = jwt_decode(localStorage.getItem("token"));

  //   regPart = <p>Welcome, {decoded.user.username}</p>
  // }

  // let loginPart = <Login login={login}></Login>;
  // if (apiService.loggedIn()) {
  //   var decoded = jwt_decode(localStorage.getItem("token"));
  //   console.log(decoded)
  //   if (decoded.user.type == "admin") {
  //     loginPart = <div>

  //       <Logout logout={logout}></Logout>

  //       <AddWish addWish={addWish} />
  //     </div>;
  //   } else {
  //     loginPart = <div>

  //       <Logout logout={logout}></Logout>

  //     </div>;
  //   }
  // }




  return (
    <>


      <Router>
        <Layout path="/">
          <Wishes path="/" data={wishes} addWish={addWish} getUser={getUser}> </Wishes>
          <Wish path="/Wish/:id" getWish={getWish} incrementVote={incrementVote} decrementVote={decrementVote} addComment={addComment} getUser={getUser} deleteWish={deleteWish}></Wish>

          <Login path="login" login={login} />
          <Registration path="registration" login={login} />
          <AddWish path="addWish" addWish={addWish} />
        </Layout>
      </Router>

      {/* 
      {regPart}
      {loginPart}
      {contents} */}



    </>
  );
}
