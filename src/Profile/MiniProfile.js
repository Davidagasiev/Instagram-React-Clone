import React, { useState, useEffect } from "react";

import "./Profile.css";
import PostGrid from "../PostGrid/PostGrid";
import Navbar from "../Navbar/Navbar";

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function MiniProfile(props) {

    return (
        <>
            <Navbar />

            <div className="container" style={{ marginTop: "60px" }}>
                <div className="Profile">

                    <IconButton style={{ marginLeft: "10px" }} edge="start" color="inherit" onClick={props.onClose} aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>

                    <div className="profile_info">
                        <div className="profile_infoavatar">
                            <div className="avatar" style={{ backgroundImage: `url(${props.userPhoto})`, cursor: "auto" }}></div>
                        </div>

                        <div className="profile_infotext">
                            <h1 style={{ marginBottom: "10px" }}>{props.userName}</h1>
                            <p style={{ textAlign: "center" }}><span>{props.posts.filter(post => post.data.uid === props.uid).length}</span> Posts</p>

                            <p>{props.bio}</p>

                        </div>
                    </div>


                    <Divider style={{ width: "100%", marginTop: "15px" }} />
                    {/* Posts */}
                    <PostGrid usersPage={false} posts={props.posts.filter(post => post.data.uid === props.uid)} />
                    {/* Posts */}
                </div>
            </div>
        </>
    )
}

export default MiniProfile;
