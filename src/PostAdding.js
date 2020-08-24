import React, {useState} from "react";
import "./PostAdding.css";
import useInput from "./Hooks/useInput";
import useToggle from "./Hooks/useToggle";
import {db, auth, storage} from "./firebase";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    const [upload, setUpload] = useState(null);
    const [showProgress, setShowProgress] = useToggle(false);
    const [progress, setProgress] = useState(0);

    function handleUpload(e) {
        if(e.target.files[0]){
            setUpload(e.target.files[0]);
        }
    }


    function addPost() {
        
        const uploadTask = storage.ref(`images/${upload.name}`).put(upload);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const newProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *  100
                )
                setShowProgress(true);
                setProgress(newProgress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref("images")
                .child(upload.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                                caption,
                                imageUrl: url,
                                likes: "[]",
                                user: auth.currentUser.displayName,
                                comments: "[]",
                                email: auth.currentUser.email
                            })
                            .then(function(docRef) {
                                console.log("Document written with ID: ", docRef.id);
                            })
                            .catch(function(error) {
                                console.error("Error adding document: ", error);
                            });
                            resetCaption();
                            props.closeModal(false);
                            setShowProgress(false);
                            setProgress(0);
                })
            }
        )

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
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUpload}
                />
                <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button style={{width: "100%"}} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>

                {showProgress ? <CircularProgress variant="static" value={progress} /> : ""}

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