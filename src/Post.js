import React, { useState, useEffect } from "react";
import "./Post.css";
import CommentsList from "./CommentsList";
import useInput from "./Hooks/useInput";
import {db, auth} from "./firebase";

import { Avatar } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import TextField from '@material-ui/core/TextField';




function Post(props) {

    const [commentForm, setCommentForm, resetCommentForm] = useInput("");


    function handleCommentSubmit(e) {
        e.preventDefault();
        if(!auth.currentUser) {
            alert("You are not logged in.")
        }else{
        const evalComments = JSON.parse(props.comments),
        newComments = [...evalComments, {user: auth.currentUser.displayName, comment: commentForm}]
        db.collection("posts").doc(props.id).set({
                caption: props.caption,
                imageUrl: props.imageUrl,
                userPhoto: props.userPhoto,
                likes: props.likes,
                user: props.user,
                saved: props.saved,
                comments: JSON.stringify(newComments)
            })
            .then(function() {
                console.log("Comments was successfully added to post " + props.id);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        resetCommentForm();}
    }


    // **************************Like Adding******************************************
    const [liked, setLiked] = useState(JSON.parse(props.likes).some(i => {
        return i === (auth.currentUser ? auth.currentUser.email : "");
    }));

    useEffect(() => {
        setLiked(JSON.parse(props.likes).some(i => {
            return i === (auth.currentUser ? auth.currentUser.email : "");
        }))
    })


    function likeAdding() {

        if(!auth.currentUser) {
            alert("You are not logged in.")
        }else{
        const currentLikes = JSON.parse(props.likes),
        newLikes = liked ? [...currentLikes].filter(i => i !== auth.currentUser.email) : [...currentLikes, auth.currentUser.email];
        db.collection("posts").doc(props.id).set({
                caption: props.caption,
                imageUrl: props.imageUrl,
                likes: JSON.stringify(newLikes),
                saved: props.saved,
                user: props.user,
                userPhoto: props.userPhoto,
                comments: props.comments,
                email: props.email
            })
            .then(function() {
                console.log("Post was successfully liked or unliked" + props.id);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        resetCommentForm();}
        
    }

    // **************************Like Adding******************************************

    // **************************Saving******************************************
        const [saved, setSaved] = useState(JSON.parse(props.saved).some(i => {
            return i === (auth.currentUser ? auth.currentUser.email : "");
        }));
    
        useEffect(() => {
            setSaved(JSON.parse(props.saved).some(i => {
                return i === (auth.currentUser ? auth.currentUser.email : "");
            }))
        })
    
    
        function saving() {
    
            if(!auth.currentUser) {
                alert("You are not logged in.")
            }else{
            const currentSaved = JSON.parse(props.saved),
            newSaved = saved ? [...currentSaved].filter(i => i !== auth.currentUser.email) : [...currentSaved, auth.currentUser.email];
            db.collection("posts").doc(props.id).set({
                    caption: props.caption,
                    imageUrl: props.imageUrl,
                    likes: props.likes,
                    saved: JSON.stringify(newSaved),
                    user: props.user,
                    userPhoto: props.userPhoto,
                    comments: props.comments,
                    email: props.email
                })
                .then(function() {
                    console.log("Post was successfully Saved or Unsaved" + props.id);
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            resetCommentForm();}
            
        }
    
    // **************************Saving******************************************
    

    return (
        <div className="Post">

            <div className="post_header">
                <div className="post_userinfo">
                    <Avatar style={{cursor:"pointer"}} src={props.userPhoto}>{(props.user + "")[0]}</Avatar>
                    <span style={{cursor:"pointer"}}>{props.user}</span>
                </div>
                <div className="post_more">
                    <MoreHorizIcon style={{cursor:"pointer"}} />
                </div>
            </div>

            <div onDoubleClick={likeAdding}>
                <img alt="Post Photo" src={props.imageUrl}/>
            </div>


            <div className="post_footer">
                <div className="post_footerlike">
                    { liked ? 
                    <FavoriteIcon onClick={likeAdding} style={{ fontSize: 30, cursor: "pointer" }}/>:
                    <FavoriteBorderIcon onClick={likeAdding} style={{ fontSize: 30, cursor:"pointer"}}/>
                    }
                </div>

                <div className="post_footersave">
                    { !saved ? 
                        <BookmarkBorderIcon onClick={saving} style={{ fontSize: 30, cursor:"pointer" }}/>:
                        <BookmarkIcon onClick={saving} style={{ fontSize: 30, cursor:"pointer" }}/>
                    }
                    
                </div>
            </div>

            <span style={{marginBottom: "10px"}}>{JSON.parse(props.likes).length} likes</span>



            <div className="post_caption">
                <p><span>{props.user}</span>{props.caption}</p>
            </div>

                {   props.comments !== "[]" ? 
                    (<CommentsList key={props.id} id={props.id} comments={props.comments}/>) : ""
                }
            <div className="post_commentform">
                <form onSubmit={handleCommentSubmit}>
                    <TextField 
                    style={{width: "100%"}}
                    value={commentForm} 
                    onChange={setCommentForm} 
                    type="text" 
                    multiline
                    placeholder="Add a comment..."/>
                    {commentForm.length !== 0 ? 
                        (<button style={{cursor:"pointer"}}>Post</button>)
                        :
                        (<button disabled>Post</button>)
                    }
                </form>
            </div>
            
        </div>
    )
}

export default Post;