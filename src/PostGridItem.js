import React from "react";
import { db } from "./firebase";

import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function PostGridItem(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

// Post Delete

function deletePost(){
    handleClose();
    db.collection("posts").doc(props.id).delete().then(function() {
            console.log("Post successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
}

// Post Delete
    return ( 
                <div key={props.id} className="gridItem" >
                    <img src={props.imageUrl} alt="Post"/>
                    <div className="overlay">
                    {window.location.pathname === "/profile" ?
                        <IconButton onClick={handleClick} style={{color: "whitesmoke", position: "relative", right: "-40%", top: "10px"}}>
                            <MoreHorizIcon />
                        </IconButton> : ""
                    }
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={deletePost}>Delete Post</MenuItem>
                        <MenuItem onClick={handleClose}>Cancel</MenuItem>
                    </Menu>
                        <ul>
                            <li><FavoriteIcon/> {props.likes}</li>
                            <li><ModeCommentIcon/> {props.comments}</li>
                        </ul>
                        
                    </div>
                </div>
    )
}

export default PostGridItem;