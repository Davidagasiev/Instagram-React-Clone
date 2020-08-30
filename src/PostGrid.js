import React from "react";
import "./PostGrid.css";


import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

function PostGrid(props) {
    return (
        <div className="postgrid">

              {props.posts.map(post => (
                <div key={post.id} className="gridItem">
                    <img src={post.data.imageUrl} alt="Post"/>
                    <div className="overlay">
                        <ul>
                            <li><FavoriteIcon/> {JSON.parse(post.data.likes).length}</li>
                            <li><ModeCommentIcon/> {JSON.parse(post.data.comments).length}</li>
                        </ul>
                    </div>
                </div>
                ))}

        </div>
    )
}

export default PostGrid;