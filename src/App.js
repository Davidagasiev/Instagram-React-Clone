import React, { useState, useEffect } from 'react';
import "./App.css";
import {db, auth} from "./firebase";
import Navbar from "./Navbar";
import Main from "./Main";
import Profile from "./Profile";
import SavedPosts from "./SavedPosts";

import { Route, Switch, Redirect } from "react-router-dom";

function App() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 2500);

  useEffect(() =>{
    //This is how to get info from firebase
      db.collection("posts").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
          })));
      })
  }, [])
  console.log(auth.currentUser);
  return (
    <div className="App">
      {loading ?
      <div className="loadingScreen">
        <img src="https://www.freepnglogos.com/uploads/instagram-logo-png-transparent-0.png" alt="Instagram Logo"/>
      </div> : ""
      }  
    {/* Navbar */}
      <Navbar />
    {/* Navbar */}

      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Main posts={posts}/> }/>
          <Route exact path="/profile" render={() => <Profile posts={posts.filter(post => post.data.email === auth.currentUser.email)}/> }/>
          <Route exact path="/saved" render={() => <SavedPosts posts={posts}/> }/>
          <Route render={() => <Redirect to="/"/> }/>
        </Switch>
          

      </div>
  </div>
    
  );
}

export default App;