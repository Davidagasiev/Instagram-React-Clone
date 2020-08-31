import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import {auth, db} from "../firebase";
import useInput from "../Hooks/useInput";
import PostAdding from "../Posts/PostAdding";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';

// Modal styles
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "20px"
  },
}));
// Modal styles


function Navbar(props) {

// For Menu

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

// For Menu

//Handling Log In and Sign Up
  function handleLogIn() {
    handleClose();
    handleLogInModalOpen();
  }

  function handleSignUp() {
    handleClose();
    handleSignInModalOpen();
  }

// Log in inputs
  const [handleLogInEmailChange, setHandleLogInEmailChange, resetHandleLogInEmailChange] = useInput("");
  const [handleLogInPassChange, setHandleLogInPassChange, resetHandleLogInPassChange] = useInput("");
// Log in inputs

// Sign Up inputs
const [handleSignUpUserChange, setHandleSignUpUserChange, resetHandleSignUpUserChange] = useInput("");
const [handleSignUpEmailChange, setHandleSignUpEmailChange, resetHandleSignUpEmailChange] = useInput("");
const [handleSignUpPassChange, setHandleSignUpPassChange, resetHandleSignUpPassChange] = useInput("");
// Sign Up inputs


  function handleLogInSubmit(e) {
    e.preventDefault();

  // Signing In
    auth
    .signInWithEmailAndPassword(handleLogInEmailChange, handleLogInPassChange)
    .then(() => {
      
      setOpen(false);
      resetHandleLogInEmailChange();
      resetHandleLogInPassChange();
      window.location.reload();
    })
    .catch((error) => alert(error.message));
  }



  function handleSignUpSubmit(e) {
    e.preventDefault();
    


    // Signing Up
    auth
    .createUserWithEmailAndPassword(handleSignUpEmailChange, handleSignUpPassChange)
    .then((authUser) => {
        db.collection("users").doc(authUser.user.uid).set({
          uid: authUser.user.uid,
          bio: "Here goes your bio. Edit it by double clicking."
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });


        setSignUpOpen(false);
        resetHandleSignUpUserChange();
        resetHandleSignUpEmailChange();
        resetHandleSignUpPassChange();
        setTimeout(() => window.location.reload(), 1000) ;
      return authUser.user.updateProfile({
        displayName: handleSignUpUserChange.split(' ').join(''),
        photoURL: "https://us.v-cdn.net/6022045/uploads/defaultavatar.png"

      })
    })
    .catch(error => alert(error.message));
     
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //If User Logged In...
        setUser(authUser);
      }else{
        //If User Logges Out...
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user,handleSignUpUserChange])
//Handling Log In and Sign Up

// For log in Modal
const classes = useStyles();
const [open, setOpen] = React.useState(false);

const handleLogInModalOpen = () => {
  setOpen(true);
};

const handleLogInModalClose = () => {
  setOpen(false);
  resetHandleLogInEmailChange();
  resetHandleLogInPassChange();
};
// For log in Modal

// For Sign Up Modal
const [signInOpen, setSignUpOpen] = React.useState(false);

const handleSignInModalOpen = () => {
  setSignUpOpen(true);
};

const handleSignInModalClose = () => {
  setSignUpOpen(false);
  resetHandleSignUpUserChange();
  resetHandleSignUpEmailChange();
  resetHandleSignUpPassChange();
};
// For Sign Up Modal

// For Sign Up and Log In Modals


const whenLoggedOut = (
<div>
  <MenuItem onClick={handleLogIn}>Log In</MenuItem>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleLogInModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
              <Fade in={open}>
                <div className={classes.paper}>
                  <form onSubmit={handleLogInSubmit} className="userAuth">
                    <h1>Log In</h1>
                    <TextField type="email"  required value={handleLogInEmailChange} onChange={setHandleLogInEmailChange} style={{marginTop: "15px", marginBottom: "10px"}} label="Email" />
                    <TextField type="password" required value={handleLogInPassChange} onChange={setHandleLogInPassChange} style={{marginTop: "5px", marginBottom: "25px"}} label="Password" />
                   <button style={{backgroundColor: "transparent", border: "none", outline: "none"}}>
                     <Button style={{width: "100%"}} variant="contained" color="primary">Log In</Button>
                   </button>
                    
                  </form>
                </div>
              </Fade>
            </Modal>


{/********************************* Log In Modal ****************************************************/}


            <MenuItem onClick={handleSignUp}>Sign Up</MenuItem>

{/********************************* Sign Up Modal ****************************************************/}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={signInOpen}
                onClose={handleSignInModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
              <Fade in={signInOpen}>
                <div className={classes.paper}>
                  <form onSubmit={handleSignUpSubmit} className="userAuth">
                    <h1>Sign Up</h1>
                    <TextField type="text" required value={handleSignUpUserChange} onChange={setHandleSignUpUserChange} style={{marginTop: "15px", marginBottom: "10px"}} label="UserName" />
                    <TextField type="email" required value={handleSignUpEmailChange} onChange={setHandleSignUpEmailChange} style={{marginTop: "5px", marginBottom: "10px"}} label="Email" />
                    <TextField type="password" required value={handleSignUpPassChange} onChange={setHandleSignUpPassChange} style={{marginTop: "5px", marginBottom: "25px"}} label="Password" />
                   <button style={{backgroundColor: "transparent", border: "none", outline: "none"}}>
                     <Button style={{width: "100%"}}  variant="contained" color="primary">Sign Up</Button>
                   </button>
                    
                  </form>
                </div>
              </Fade>
            </Modal>


{/********************************* Sign Up Modal ****************************************************/}
</div>
);
// For Log Out Button

const handlePostAddingClose = () => {
  setAnchorEl(null);
  setPostAdding(false);
};

const [postAddingOpen, setPostAdding] = React.useState(false);

const handlePostAddingModalOpen = () => {
  setPostAdding(true);
};

function handlePostAdding() {
  handleClose();
  handlePostAddingModalOpen();
}

const whenLoggedIn = (
  <div>
    <MenuItem ><a style={{color: "black"}} href="/profile"><AccountCircleIcon/> My Profile</a></MenuItem>
    <MenuItem ><a style={{color: "black"}} href="/profile/saved"><BookmarksIcon/> Saved</a></MenuItem>
    <MenuItem onClick={handlePostAdding}><AddBoxIcon/> Create Post</MenuItem>
    {/********************************* Post Adding Modal ****************************************************/}

              <Modal
                style={{minWidth: "200px", minHeight: "200px"}}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={postAddingOpen}
                onClose={handlePostAddingClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
              <Fade in={postAddingOpen}>
                <div className={classes.paper}>
                  <PostAdding bio={props.bio} closeModal={setPostAdding}/>
                </div>
              </Fade>
            </Modal>


{/********************************* Post Adding Modal ****************************************************/}
    <MenuItem ><a href="/profile/settings" style={{color: "black"}}><SettingsIcon />Settings</a></MenuItem>
    <Divider />
    <MenuItem onClick={() => {
      auth.signOut();
      setAnchorEl(null); 
      setTimeout(() => {
        if(window.location.pathname !== "/"){
          window.location.replace("/");
        }else{
          window.location.reload();
        }
      },1000)
      
      } }><ExitToAppIcon /> Log Out</MenuItem>
  </div>
);



    // from navbar avatar
    const [userAvatar, setUserAvatar] = useState({});
    
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if(authUser) {
            setUserAvatar(authUser);
          }
        })
      }, [])
  return (
      
      <nav className="app_nav">
        <div className="nav_container">
        {/* Icon Div */}

          <div className="app_navicon">
            <a href="/">
              <img style={{cursor:"pointer"}} alt="Instagram Icon" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
            </a>
          </div>

        {/* Icon Div */}

        {/* Extra Div */}

          <div className="app_navextra">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar src={userAvatar.photoURL}/>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
            
            {
              user ? whenLoggedIn : whenLoggedOut
            }
              
            </Menu>
          </div>

        {/* Extra Div */}
        </div>
      </nav>
  );
}

export default Navbar;