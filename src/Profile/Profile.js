import React, { useEffect, useState } from "react";
import { auth, storage, db } from "../firebase";
import "./Profile.css";
import PostGrid from "../PostGrid/PostGrid";
import useToggle from "../Hooks/useToggle";
import mergeSort from "../Hooks/mergeSort";

import { NavLink } from "react-router-dom";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    display: "none"
  }
}));



function Profile(props) {

  // For modal
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // For Modal

  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    })
  }, [])

  //For editing profile
  const [upload, setUpload] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [havePhoto, setHavePhoto] = useToggle(false);
  const [progress, setProgress] = useState(0);


  function photoUpload() {

    const uploadTask = storage.ref(`images/${upload.name}`).put(upload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const newProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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


            auth.currentUser.updateProfile({
              photoURL: url
            }).then(function () {
              // Update successful.
              const myPosts = props.posts.filter(post => post.data.uid === auth.currentUser.uid);
              myPosts.forEach(post => {
                if (post.data.userPhoto !== url) {
                  // To update UserPhoto
                  db.collection("posts").doc(post.id).set({
                    caption: post.data.caption,
                    imageUrl: post.data.imageUrl,
                    likes: post.data.likes,
                    saved: post.data.saved,
                    user: post.data.user,
                    userPhoto: url,
                    comments: post.data.comments,
                    uid: post.data.uid,
                    bio: post.data.bio,
                    date: post.data.date
                  })
                    .then(function () {
                      console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                      console.error("Error writing document: ", error);
                    });
                }
              });
              console.log("Photo was updated successfully");
            }).catch(function (error) {
              // An error happened.
              console.log(error.message);
            });

            setProgress(0);
            setShowProgress(false);
            setHavePhoto(false);
            handleClose();
          })
      }
    )
  }

  function handleUpload(e) {
    if (e.target.files[0]) {
      setUpload(e.target.files[0]);
      setHavePhoto();
    }
  }

  useEffect(() => {
    if (havePhoto) {
      photoUpload();
    }
  }, [upload])


  function removePhoto() {
    var user = auth.currentUser;

    user.updateProfile({
      photoURL: "https://us.v-cdn.net/6022045/uploads/defaultavatar.png"
    }).then(function () {
      // Update successful.
      const myPosts = props.posts.filter(post => post.data.uid === auth.currentUser.uid);
      myPosts.forEach(post => {
        // To update UserPhoto
        db.collection("posts").doc(post.id).set({
          caption: post.data.caption,
          imageUrl: post.data.imageUrl,
          likes: post.data.likes,
          saved: post.data.saved,
          user: post.data.user,
          userPhoto: "https://us.v-cdn.net/6022045/uploads/defaultavatar.png",
          comments: post.data.comments,
          uid: post.data.uid,
          bio: post.data.bio,
          date: post.data.date
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      });
      console.log("Photo was deleted");
      handleClose();
    }).catch(function (error) {
      // An error happened.
      console.log(error.message);
    });
  }

  // For bio updating
  const [bioUpdating, setBioUpdating] = useToggle(false);
  const [bioInput, setBioInput] = useState(props.bio);

  function handleBioInput(e) {
    setBioInput(e.target.value);
  }

  useEffect(() => {
    setBioInput(props.bio);
  }, [props.bio])


  function editBio() {

    //To update collection
    db.collection("users").doc(auth.currentUser.uid).set({
      bio: bioInput,
      uid: auth.currentUser.uid
    })
      .then(function () {
        props.posts.forEach(post => {
          // To update UserPhoto
          db.collection("posts").doc(post.id).set({
            caption: post.data.caption,
            imageUrl: post.data.imageUrl,
            likes: post.data.likes,
            saved: post.data.saved,
            user: post.data.user,
            userPhoto: post.data.userPhoto,
            comments: post.data.comments,
            uid: post.data.uid,
            bio: bioInput,
            date: post.data.date
          })
            .then(function () {

            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        });
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    setBioUpdating();
  }

  const bioForm = (
    <form style={{ marginTop: "20px" }}>
      <TextField
        id="outlined-multiline-static"
        label="Bio"
        multiline
        rows={4}
        value={bioInput}
        onChange={handleBioInput}
        variant="outlined"
      />
      <Button onClick={editBio}>Change</Button>
    </form>
  )

  // For bio updating

  return (
    <div className="Profile">
      <div className="profile_info">
        <div className="profile_infoavatar">
          <div onClick={handleOpen} className="avatar" style={{ backgroundImage: `url(${user.photoURL})` }}></div>
          <p onClick={handleOpen}>Change Photo</p>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <input
                  onChange={handleUpload}
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                {user.photoURL !== "https://us.v-cdn.net/6022045/uploads/defaultavatar.png" ?
                  (<label style={{ width: "100%" }} htmlFor="contained-button-file">
                    <Button style={{ width: "100%" }} variant="contained" color="primary" component="span">
                      Upload Photo
                        </Button>
                  </label>)
                  :
                  (<label style={{ width: "100%" }} htmlFor="contained-button-file">
                    <Button style={{ width: "100%" }} variant="contained" color="primary" component="span">
                      Upload Photo
                        </Button>
                  </label>)
                }
                {showProgress ? <CircularProgress style={{ marginTop: "20px" }} variant="static" value={progress} /> : ""}
                {user.photoURL !== "https://us.v-cdn.net/6022045/uploads/defaultavatar.png" ?
                  <Button onClick={removePhoto} variant="contained" style={{ marginTop: "20px" }} color="secondary">Remove Current Photo</Button>
                  : ""
                }
              </div>
            </Fade>
          </Modal>

        </div>
        <div className="profile_infotext">
          <h1 style={{ marginBottom: "10px" }}>{user.displayName}</h1>
          <Button variant="contained"><a href="/profile/settings" style={{ width: "100%", color: "black" }}>Edit Profile</a></Button>
          {props.saved ?
            <p style={{ textAlign: "center" }}><span>{props.posts.filter(post => JSON.parse(post.data.saved).some(i => {
              return i === (auth.currentUser ? auth.currentUser.uid : "")
            })).length}</span> Saved Posts</p>
            :
            <p style={{ textAlign: "center" }}><span>{props.posts.length}</span> Posts</p>
          }
          <span>{user.displayName}</span>
          {bioUpdating ? bioForm :
            <p onDoubleClick={setBioUpdating}>{props.bio}</p>
          }
        </div>
      </div>
      <ul style={{ textAlign: "center", borderTop: "1px solid lightgrey", marginTop: "50px" }}>
        <NavLink className="ulLink" exact to="/profile" activeClassName="activeLink">Posts</NavLink>
        <NavLink className="ulLink" exact to="/profile/saved" activeClassName="activeLink" >Saved</NavLink>
      </ul>
      {props.saved ?
        <PostGrid usersPage={false} posts={mergeSort(
          props.posts.filter(post => JSON.parse(post.data.saved).some(i => {
            return i === (auth.currentUser ? auth.currentUser.uid : "")
          })))
        } />
        :
        <PostGrid usersPage={true} posts={mergeSort(props.posts.filter(post => post.data.uid === auth.currentUser.uid))} />
      }
    </div>
  )
}

export default Profile;