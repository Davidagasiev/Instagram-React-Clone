import React, { useEffect, useState } from "react";
import "./EditProfile.css"
import { auth, storage, db } from "../firebase";
import useToggle from "../Hooks/useToggle";
import useInput from '../Hooks/useInput';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';


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

const EditProfile = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    })
  }, [])

  // For Updating profile Photo

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

            var user = auth.currentUser;

            user.updateProfile({
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
  // For Updating profile Photo

  // Profile Deleting

  function handleDelete() {
    const userID = auth.currentUser.uid;
    auth.currentUser.delete().then(function () {
      // User deleted.
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });

    db.collection("users").doc(userID).delete().then(function () {
      console.log("Document successfully deleted!");

    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    setTimeout(() => window.location.replace("/"), 1000);
  }

  // Profile Deleting

  // For username
  const [usernameInput, setUsernameInput] = useState("");

  function handleUsernameInput(e) {
    setUsernameInput(e.target.value);
  }

  useEffect(() => {
    if (auth.currentUser) setUsernameInput(auth.currentUser.displayName);
  }, [auth.currentUser]);
  // For username

  //For Bio
  const [bioInput, setBioInput] = useState(props.bio);

  function handleBioInput(e) {
    setBioInput(e.target.value);
  }

  useEffect(() => {
    setBioInput(props.bio);
  }, [props.bio]);

  //For Bio

  // For UserName And Bio

  function changeUserNameAndBio(e) {
    e.preventDefault();
    user.updateProfile({
      displayName: usernameInput
    }).then(function () {
      // Update successful.

      // To update bio
      db.collection("users").doc(auth.currentUser.uid).set({
        bio: bioInput,
        uid: auth.currentUser.uid
      })
        .then(function () {
          //  Update username on all posts

          const myPosts = props.posts.filter(post => post.data.uid === auth.currentUser.uid);
          myPosts.forEach(post => {
            // To update UserPhoto
            db.collection("posts").doc(post.id).set({
              caption: post.data.caption,
              imageUrl: post.data.imageUrl,
              likes: post.data.likes,
              saved: post.data.saved,
              user: usernameInput,
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
          alert("Username and Bio were successfully Updated.")
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        })

      // To update username in other posts and comments

      props.posts.forEach(post => {
        // To update UserPhoto
        let userComments = [], otherComments = [], newComments = [];

        JSON.parse(post.data.comments).forEach(item => {
          if (item.uid === auth.currentUser.uid) {
            userComments = [...userComments, { user: usernameInput, uid: item.uid, comment: item.comment }];
          } else {
            otherComments = [...otherComments, item];
          }
        })


        newComments = [...userComments, ...otherComments];
        db.collection("posts").doc(post.id).set({
          caption: post.data.caption,
          imageUrl: post.data.imageUrl,
          likes: post.data.likes,
          saved: post.data.saved,
          user: post.data.user,
          userPhoto: post.data.userPhoto,
          comments: JSON.stringify(newComments),
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
      // To update username in other posts and comments


    }).catch(function (error) {
      // An error happened.
      alert(error.message);
    });
  }

  // For UserName And Bio

  // For Password

  const [passwordInput, setPasswordInput, resetPasswordInput] = useInput("");


  function changePassword() {
    auth.currentUser.updatePassword(passwordInput).then(function () {
      // Update successful.
      alert("Password was successfully updated");
      resetPasswordInput();
    }).catch(function (error) {
      // An error happened.
      alert(error.message);
    });
  }

  // For password

  // For email
  const [emailInput, setEmailInput] = useState("");

  function handleEmailInput(e) {
    setEmailInput(e.target.value);
  }

  useEffect(() => {
    if (auth.currentUser) {
      setEmailInput(auth.currentUser.email);
    }
  }, [auth.currentUser]);

  // For email

  //Email Changing

  function changeEmail(e) {
    e.preventDefault();
    auth.currentUser.updateEmail(emailInput).then(function () {
      // Update successful.
      //Sending Verification
      auth.currentUser.sendEmailVerification().then(function () {
        // Email sent.
        alert("We send you a verification email so check your email.");
      }).catch(function (error) {
        // An error happened.
        alert(error.message);
        console.log(error);
      });
      //Sending Verification
    }).catch(function (error) {
      // An error happened.
      console.log(error);
      alert(error.message);
    });
  }

  // Email Changing

  return (
    <div className="EditProfile">
      <h1>Settings</h1>

      {/* For Profile Photo */}

      <div className="profile_infoavatar">
        <div onClick={handleOpen} className="avatar" style={{ backgroundImage: `url(${user.photoURL})` }}></div>
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
              <label style={{ width: "100%", marginBottom: "20px" }} htmlFor="contained-button-file">
                <Button style={{ width: "100%" }} variant="contained" color="primary" component="span">
                  Upload Photo
                        </Button>
              </label>
              {showProgress ? <CircularProgress variant="static" value={progress} /> : ""}
              <Button onClick={removePhoto} variant="contained" style={{ marginTop: "20px" }} color="secondary">Remove Current Photo</Button>
            </div>
          </Fade>
        </Modal>

      </div>
      <label style={{ color: "#4169E1", cursor: "pointer" }} onClick={handleOpen}>Update Profile Photo</label>
      {/* For Profile Photo */}


      <form>
        <div className="EditProfile_div">
          <label htmlFor="username">Username</label>
          <input value={usernameInput} onChange={handleUsernameInput} id="username" type="text" className="EditProfile_input" />
        </div>

        <div className="EditProfile_div">
          <label htmlFor="bio">Bio</label>
          <textarea value={bioInput} onChange={handleBioInput} id="bio" type="text" className="EditProfile_input" />
        </div>


        <Button onClick={changeUserNameAndBio} variant="contained" color="primary">
          Submit
                </Button>

      </form>


      <Divider style={{ width: "100%" }} />


      {/* For Email */}
      <form style={{ marginTop: "50px" }}>
        <div className="EditProfile_div">
          <label htmlFor="email">Email</label>
          <input value={emailInput} onChange={handleEmailInput} id="email" type="text" className="EditProfile_input" />
        </div>
        <Button onClick={changeEmail} variant="contained" color="primary">
          Change Email
                  </Button>
      </form>
      {/* For Email */}


      <Divider style={{ width: "100%" }} />


      {/* Password Form */}
      <form style={{ marginTop: "50px" }}>

        <div className="EditProfile_div">
          <label htmlFor="password">Password</label>
          <input value={passwordInput} onChange={setPasswordInput} id="password" type="text" className="EditProfile_input" />
        </div>

        <Button onClick={changePassword} variant="contained" color="primary">
          Change Password
                </Button>

      </form>
      {/* Password Form */}

      <Divider style={{ width: "100%" }} />

      <Button onClick={handleDelete} variant="contained" color="secondary">
        Delete Account
            </Button>
    </div>
  )
}

export default EditProfile;