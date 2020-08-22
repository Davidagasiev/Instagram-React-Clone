import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import {auth} from "./firebase";
import useInput from "./Hooks/useInput";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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


function Navbar() {

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
    setOpen(false);
    resetHandleLogInEmailChange();
    resetHandleLogInPassChange();

  // Signing In
    auth
    .signInWithEmailAndPassword(handleLogInEmailChange, handleLogInPassChange)
    .catch((error) => alert(error.message));
  }



  function handleSignUpSubmit(e) {
    e.preventDefault();
    setSignUpOpen(false);
    resetHandleSignUpUserChange();
    resetHandleSignUpEmailChange();
    resetHandleSignUpPassChange();


    // Signing Up
    auth
    .createUserWithEmailAndPassword(handleSignUpEmailChange, handleSignUpPassChange)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: handleSignUpUserChange
      })
    })
    .catch(error => alert(error.message));

  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //If User Logged In...
        console.log(authUser);
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
                     <Button style={{width: "100%"}}  variant="contained" color="primary">Log In</Button>
                   </button>
                    
                  </form>
                </div>
              </Fade>
            </Modal>


{/********************************* Sign Up Modal ****************************************************/}
</div>
);
// For Log Out Button
const whenLoggedIn = (
  <MenuItem onClick={() => auth.signOut() }>Log Out</MenuItem>
);

  return (
      
      <nav className="app_nav">
        <div className="nav_container">
        {/* Icon Div */}

          <div className="app_navicon">
            <img  alt="Instagram Icon" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
          </div>

        {/* Icon Div */}

        {/* Extra Div */}

          <div className="app_navextra">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar src="https://us.v-cdn.net/6022045/uploads/defaultavatar.png" />
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