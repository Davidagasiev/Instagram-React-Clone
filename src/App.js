import React, { useState, useEffect } from 'react';
import "./App.css";
import {db, auth} from "./firebase";
import Navbar from "./Navbar";
import Main from "./Main";
import Profile from "./Profile";
import SavedPosts from "./SavedPosts";

import { Route, Switch, Redirect } from "react-router-dom";

function App() {

  function bubbleSort(arr){
    let noSwaps;
    for(let i = arr.length; i > 0; i--){
      noSwaps = true;
      for(let j = 0; j < i - 1; j++){
        if(arr[j].data.date.toDate().getTime() < arr[j+1].data.date.toDate().getTime()){
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
          noSwaps = false;         
          }
        }
      if(noSwaps) break;
    }
  return arr;
}

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  setTimeout(() => setLoading(false), 2500);

  useEffect(() =>{
    //This is how to get info from firebase
      db.collection("posts").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
          })));
      
      })

      db.collection("users").onSnapshot(snapshot => {
        setUsers(snapshot.docs.map(doc => ({
          ...doc.data()
          })));
      })
  }, [])

  return (
    <div className="App">
      {loading ?
      <div className="loadingScreen">
        <img src="https://www.freepnglogos.com/uploads/instagram-logo-png-transparent-0.png" alt="Instagram Logo"/>
      </div> : ""
      }  
    {/* Navbar */}
      <Navbar users={users} />
    {/* Navbar */}

      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Main bubbleSort={bubbleSort} posts={posts}/> }/>
          <Route exact path="/profile" render={() => <Profile bubbleSort={bubbleSort} users={users} posts={posts.filter(post => post.data.email === auth.currentUser.email)}/> }/>
          <Route exact path="/profile/saved" render={() => <SavedPosts bubbleSort={bubbleSort} users={users} posts={posts}/> }/>
          <Route render={() => <Redirect to="/"/> }/>
        </Switch>
          

      </div>
  </div>
    
  );
}

export default App;