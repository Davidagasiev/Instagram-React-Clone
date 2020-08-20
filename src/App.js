import React, { useState } from 'react';
import "./App.css";
import Post from "./Post";

function App() {

  const [posts, setPosts] = useState([
    {user: "David",
     likes: 1000,
     imageUrl: "https://www.pandasecurity.com/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
     caption: "This is Post caption of the instagram react clone lorem30d Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    comments: [
      {user: "Artur", comment: "Devid this is realy good idea."},
      {user: "Sophia", comment: "Devid this is realy good idea from Sophia."}
    ]
    },
    {user: "Artur",
     likes: 1595,
     imageUrl: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
     caption: "This is Post caption of the instagram react clone lorem30d Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    comments: [
      {user: "Artur", comment: "Devid this is realy good idea."},
      {user: "Sophia", comment: "Devid this is realy good idea from Sophia."}
    ]
    },
    {user: "Elza",
     likes: 505,
     imageUrl: "https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
     caption: "This is Post caption of the instagram react clone lorem30d Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    comments: [
      {user: "David", comment: "Devid this is realy good idea."},
      {user: "Bella", comment: "Eliz this is realy idea."},
      {user: "Sophia", comment: "Devid this is realy good idea from Sophia."}
    ]
    }
  ])

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
          posts.map(post => <Post {...(post)} />  )
        }

      </div>
    </div>
  );
}

export default App;
