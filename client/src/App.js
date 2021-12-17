import "./styles.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { Router } from "@reach/router";
import Wishes from "./Wishes";
import AddWish from "./AddWish";
import UpdateWish from "./UpdateWish";
import Wish from "./Wish";
import apiService from "./apiService";
import Layout from "./Layout";
import Login from "./Login";
import Registration from "./Registration";
import jwt_decode from "jwt-decode";

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
        setErrorMessage("Password mistmatch or there is no user with this username!")
        console.error("Password mistmatch or there is no user with this username!", error);
      }
    } else {
      setErrorMessage("Username and password need to be filled!")
      throw "Username and password need to be filled!"
    }
  }

  async function makeReceived(wishId) {

    var index = wishes.findIndex((wish) => wish._id === wishId);
    const updatedWish = await apiService.put(`/allWishes/makeReceived/${wishId}`,)

    setWishes([...wishes.slice(0, index), updatedWish, ...wishes.slice(index + 1)]);
    getData()

  }

  async function makeUnreceived(wishId) {

    var index = wishes.findIndex((wish) => wish._id === wishId);
    const updatedWish = await apiService.put(`/allWishes/makeUnreceived/${wishId}`,)

    setWishes([...wishes.slice(0, index), updatedWish, ...wishes.slice(index + 1)]);
    getData()

  }

  async function incrementVote(wishId) {

    var index = wishes.findIndex((wish) => wish._id === wishId);
    const updatedWish = await apiService.put(`/allWishes/incrementVote/${wishId}`,)

    setWishes([...wishes.slice(0, index), updatedWish, ...wishes.slice(index + 1)]);
    getData()

  }

  async function decrementVote(wishId) {

    var index = wishes.findIndex((wish) => wish._id === wishId);
    const updatedWish = await apiService.put(`/allWishes/decrementVote/${wishId}`,)

    setWishes([...wishes.slice(0, index), updatedWish, ...wishes.slice(index + 1)]);
    getData()

  }

  async function deleteWish(wishId) {
    const wishes = await apiService.delete(`/allWishes/deleteWish/${wishId}`);
    window.location.reload();
    setWishes(wishes);
  }

  async function addComment(wishId, comment, setErrorMessage) {
    if (comment !== "" && apiService.loggedIn()) {
      setErrorMessage("")
      var decoded = jwt_decode(localStorage.getItem("token"));
      var index = wishes.findIndex((wish) => wish._id === wishId);
      const newComment = { submitter: decoded.user, content: comment, date: Date.now() };
      const data = await apiService.put(`/allWishes/addComment/${wishId}`, newComment,)

      setWishes([...wishes.slice(0, index), data, ...wishes.slice(index + 1)]);
      getData()

    }
    else {
      setErrorMessage("The comment needs to be filled and you have to be logged in!")
    }
  }


  return (
    <>
      <Router>
        <Layout path="/">
          <Wishes path="/" data={wishes} getUser={getUser}> </Wishes>
          <Wish path="/Wish/:id" getWish={getWish} makeUnreceived={makeUnreceived} makeReceived={makeReceived} incrementVote={incrementVote} decrementVote={decrementVote} addComment={addComment} getUser={getUser} deleteWish={deleteWish}></Wish>
          <Login path="login" login={login} />
          <Registration path="registration" users={users} login={login} />
          <AddWish path="addWish" setWishes={setWishes} wishes={wishes} />
          <UpdateWish path="/updateWish/:id" getWish={getWish} setWishes={setWishes} wishes={wishes} />
        </Layout>
      </Router>
    </>
  );
}
