import React, { useState } from "react";
import "./Post.css";
import CommentsList from "./CommentsList";
import useInput from "./Hooks/useInput";

import { Avatar } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

function Post(props) {

    const [commentForm, setCommentForm, resetCommentForm] = useInput("");

    function handleCommentSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="Post">

            <div className="post_header">
                <div className="post_userinfo">
                    <Avatar>{(props.user + "")[0]}</Avatar>
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

                {   props.comments ? 
                    (<CommentsList key={props.id} id={props.id} comments={props.comments}/>) : ""
                }
            <div className="post_commentform">
                <form onSubmit={handleCommentSubmit}>
                    <input value={commentForm} onChange={setCommentForm} type="text" placeholder="Add a comment..."/>
                    {commentForm.length !== 0 ? 
                        (<button>Post</button>)
                        :
                        (<button disabled>Post</button>)
                    }

                </form>
            </div>
            
        </div>
    )
}

export default Post;