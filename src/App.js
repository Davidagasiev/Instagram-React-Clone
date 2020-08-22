import React, { useState, useEffect } from 'react';
import "./App.css";
import {db} from "./firebase";
import Navbar from "./Navbar";
import PostList from "./PostList";

import InstagramEmbed from 'react-instagram-embed';

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
      <Navbar />
    {/* Navbar */}

      <div className="container">
          {/* Post List */}
            <PostList posts={posts} />
          {/* Post List */}


{/**************************** Instagram Sidebar 8*************************************/}
            <div className="embed">
              <InstagramEmbed
                url='https://www.instagram.com/p/B_9au0YnJok/'
                maxWidth={400}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
            </div>
{/**************************** Instagram Sidebar 8*************************************/}
      </div>
    </div>
  );
}

export default App;