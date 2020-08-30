import React from "react";
import "./PostGrid.css";
import PostGridItem from "./PostGridItem";

function PostGrid(props) {
    return (
        <div className="postgrid">

              {props.posts.map(post => (
                <PostGridItem key={post.id} id={post.id} uid={post.data.uid} imageUrl={post.data.imageUrl} likes={JSON.parse(post.data.likes).length} comments={JSON.parse(post.data.comments).length}/>
                ))}

        </div>
    )
}

export default PostGrid;