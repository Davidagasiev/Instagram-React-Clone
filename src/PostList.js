import React from "react";
import Post from "./Post";

function PostList(props) {
    return (
        <div>
            {
              props.posts.map(post => <Post key={post.id} id={post.id} {...(post.data)} />  )
            }
        </div>
    )
}

export default PostList;