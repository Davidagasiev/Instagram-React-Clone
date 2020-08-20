import React, { useState, useEffect } from 'react';
import "./App.css";
import Post from "./Post";
import {db} from "./firebase";

function App() {

  const [posts, setPosts] = useState([])


  useEffect(() =>{
    //This is how to get info from firebase
      db.collection("posts").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
          })));
      })
  }, [])


  return (
    <div className="App">

    {/* Navbar */}
      <nav className="app_nav">
        <div className="nav_container">
        {/* Icon Div */}
          <div className="app_navicon">
            <img  alt="Instagram Icon" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
          </div>
        {/* Icon Div */}
        {/* Extra Div */}
          <div className="app_navextra">
            <button>Log In</button>
          </div>
        {/* Extra Div */}

        </div>
      </nav>
    {/* Navbar */}

      <div className="container">
        <h1>Instagram react Clone</h1>

        {
          posts.map(post => <Post key={post.id} id={post.id} {...(post.data)} />  )
        }

      </div>
    </div>
  );
}

export default App;
