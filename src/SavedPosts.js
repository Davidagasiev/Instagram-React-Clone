import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import "./Profile.css";
import PostGrid from "./PostGrid";

import { NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button';


function SavedPosts(props) {

    const [user, setUser] = useState({});  
    
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if(authUser) {
            setUser(authUser);
          }
        })
      }, [])

      
    return (
        <div className="Profile">
            <div className="profile_info">
                 <div className="profile_infoavatar">
                     <img src={user.photoURL} alt="Profile Photo"/>
                 </div>
                 <div className="profile_infotext">
                    <h1 style={{marginBottom: "10px"}}>{user.displayName}</h1>
                    <Button variant="contained">Edit Profile</Button>
                    <p style={{textAlign: "center"}}><span>{props.posts.filter(post => post.data.email === auth.currentUser.email).length}</span> Posts</p>
                    <p><span>{user.displayName}</span><br/>dede ef fwergfewgwerh thwerlorem fe wf iwe ufiw fi nhnpk s  jdeojd dde efe</p>
                 </div>
            </div>
            <ul style={{textAlign: "center", borderTop: "1px solid lightgrey", marginTop: "50px"}}>
                <NavLink className="ulLink" exact to="/profile" activeClassName="activeLink">Posts</NavLink>
                <NavLink className="ulLink" exact to="/saved" activeClassName="activeLink" >Saved</NavLink>
            </ul>

            {/* Saved Posts */}
            <PostGrid posts={props.posts.filter(post => JSON.parse(post.data.saved).some(i => {
          return i === (auth.currentUser ? auth.currentUser.email : "")}))} />
            {/* Saved Posts */}
        </div>
    )
}

export default SavedPosts;