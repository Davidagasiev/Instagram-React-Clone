import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { db, auth } from "./firebase";

import Main from "./Main";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  setTimeout(() => setLoading(false), 2500);

  useEffect(() => {
    //This is how to get info from firebase
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      );
    });

    db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
    });
  }, []);

  //For bio
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      Array.prototype.forEach.call(users, (user) => {
        if (user.uid === auth.currentUser.uid) setBio(user.bio);
      });
    }
  }, [users]);
  //For bio

  return (
    <div className="App">
      {loading ? (
        <div className="loadingScreen">
          <img
            src="https://www.freepnglogos.com/uploads/instagram-logo-png-transparent-0.png"
            alt="Instagram Logo"
          />
        </div>
      ) : (
        ""
      )}
      {/* Navbar */}
      <Navbar bio={bio} users={users} />
      {/* Navbar */}

      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Main posts={posts} />} />

          <Route
            exact
            path="/profile"
            render={() => (
              <Profile
                saved={false}
                bio={bio}
                users={users}
                posts={posts.filter(
                  (post) => post.data.uid === auth.currentUser.uid
                )}
              />
            )}
          />

          <Route
            exact
            path="/profile/saved"
            render={() => (
              <Profile saved={true} bio={bio} users={users} posts={posts} />
            )}
          />

          <Route
            exact
            path="/profile/settings"
            render={() => (
              <EditProfile
                bio={bio}
                posts={posts}
                users={users}
                userName={auth.currentUser}
              />
            )}
          />

          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
