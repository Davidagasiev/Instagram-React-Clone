import React, { useState } from "react";
import "./Post.css";
import CommentsList from "./CommentsList";

import { Avatar } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

function Post(props) {
    return (
        <div className="Post">

            <div className="post_header">
                <div className="post_userinfo">
                    <Avatar>{props.user[0]}</Avatar>
                    <span>{props.user}</span>
                </div>
                <div className="post_more">
                    <MoreHorizIcon />
                </div>
            </div>

            <div>
                <img alt="Post Photo" src={props.imageUrl}/>
            </div>


            <div className="post_footer">
                <div className="post_footerlike">
                    <FavoriteBorderIcon style={{ fontSize: 30 }}/>
                </div>

                <div className="post_footersave">
                    <BookmarkBorderIcon style={{ fontSize: 30 }}/>
                </div>
            </div>

            <span style={{marginBottom: "10px"}}>{props.likes} likes</span>



            <div className="post_caption">
                <p><span>{props.user}</span>{props.caption}</p>
            </div>

            <CommentsList comments={props.comments}/>

            <div className="post_commentform">
                <form>
                    <input type="text" placeholder="Add a comment..."/>
                    <button>Post</button>
                </form>
            </div>
            
        </div>
    )
}

export default Post;