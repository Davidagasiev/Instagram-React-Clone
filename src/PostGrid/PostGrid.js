import React from "react";
import "./PostGrid.css";
import PostGridItem from "./PostGridItem";

function PostGrid(props) {
    return (
        <ul className="postgrid">

              {props.posts.map(post => (
                <PostGridItem usersPage={props.usersPage} key={post.id} id={post.id} uid={post.data.uid} imageUrl={post.data.imageUrl} likes={JSON.parse(post.data.likes).length} comments={JSON.parse(post.data.comments).length}/>
                ))}

        </ul>
    )
}

export default React.memo(PostGrid);