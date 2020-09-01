import React from "react";
import { db } from "../firebase";

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
                <li key={props.id} className="gridItem" >
                    <div className="gridItem_div" style={{backgroundImage: `url(${props.imageUrl})`}}></div>
                    <div className="overlay">
                    {window.location.pathname === "/profile" ?
                        <IconButton onClick={handleClick} >
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
                    </Menu>
                        {props.usersPage ? 
                        <ul>
                            <li><FavoriteIcon/> {props.likes}</li>
                            <li><ModeCommentIcon/> {props.comments}</li>
                        </ul>
                        :
                        <ul style={{top: "45%"}}>
                            <li><FavoriteIcon/> {props.likes}</li>
                            <li><ModeCommentIcon/> {props.comments}</li>
                        </ul>
                        }
                        
                    </div>
                </li>
    )
}

export default React.memo(PostGridItem);