import React from "react";
import "./PostGrid.css";

function PostGrid(props) {
    return (
        <div className="postgrid">

              {props.posts.map(post => (<div className="gridItem"><img src={post.data.imageUrl}/></div>))}

        </div>
    )
}

export default PostGrid;