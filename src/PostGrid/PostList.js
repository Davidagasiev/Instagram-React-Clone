import React from "react";
import Post from "../Posts/Post";

function PostList(props) {
    return (
        <div>
            {
              props.posts.map(post => <Post posts={props.posts} key={post.id} id={post.id} {...(post.data)} />  )
            }
        </div>
    )
}

export default React.memo(PostList);