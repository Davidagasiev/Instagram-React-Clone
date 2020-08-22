import React from "react";
import "./PostAdding.css";
import useInput from "./Hooks/useInput";
import useToggle from "./Hooks/useToggle";
import {db, auth} from "./firebase";

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

  

function PostAdding(props) {
    const classes = useStyles();


    const [caption, setCaption, resetCaption] = useInput("");
    const [urlInput, setUrlInput, resetUrlInput] = useInput("");
    const [showUrlInput, toggleShowUrlInput] = useToggle(false)

    function addPost() {
        db.collection("posts").add({
            caption,
            imageUrl: urlInput,
            likes: 0,
            user: auth.currentUser.displayName,
            comments: "[]"
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        resetCaption();
        resetUrlInput();
        props.closeModal(false);
    }

    return (
        <div className="PostAdding">
            <h1>Add New Post</h1>
            <form>
                <TextField
                    id="outlined-multiline-static"
                    label="Caption"
                    multiline
                    rows={4}
                    value={caption}
                    onChange={setCaption}
                    variant="outlined"
                />
                <FormControlLabel
                    control={
                    <Switch
                        checked={showUrlInput}
                        onChange={toggleShowUrlInput}
                        color="primary"
                    />
                    }
                label="Use Link"
                />
                {showUrlInput ?
                    <TextField
                    id="outlined-multiline-static"
                    label="Image URL"
                    value={urlInput}
                    onChange={setUrlInput}
                    variant="outlined"
                    type="link"
                />:
                    (<>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddPhotoAlternateIcon />}
                        >
                            Upload
                        </Button>
                        </>
                    )
                }
                <Button
                    onClick={addPost}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<AddCircleIcon />}
                        >
                            Add Post
                </Button>
            </form>
        </div>
    )
}

export default PostAdding;