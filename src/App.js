import React, { useState, useEffect } from 'react';
import "./App.css";
import Post from "./Post";
import {db} from "./firebase";
import useInput from "./Hooks/useInput";
import useToggle from "./Hooks/useToggle";

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
  },
}));
// Modal styles


function App() {

  const [posts, setPosts] = useState([])


  useEffect(() =>{
    //This is how to get info from firebase
      db.collection("posts").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
          })));
      })
  }, [])

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
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    setSignUpOpen(false);
    resetHandleSignUpUserChange();
    resetHandleSignUpEmailChange();
    resetHandleSignUpPassChange();
  }
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


  return (
    <div className="App">

    {/* Navbar */}
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
              <MenuItem onClick={handleLogIn}>Log In</MenuItem>
{/********************************* Log In Modal ****************************************************/}

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
                      <TextField type="email" required value={handleLogInEmailChange} onChange={setHandleLogInEmailChange} style={{marginTop: "15px", marginBottom: "10px"}} id="standard-basic" label="Email" />
                      <TextField type="password" required value={handleLogInPassChange} onChange={setHandleLogInPassChange} style={{marginTop: "5px", marginBottom: "25px"}} id="standard-basic" label="Password" />
                     <button style={{backgroundColor: "transparent", border: "none", outline: "none"}}>
                       <Button style={{width: "100%"}}  variant="contained" color="primary">Log In</Button>
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
                      <TextField type="text" required value={handleSignUpUserChange} onChange={setHandleSignUpUserChange} style={{marginTop: "15px", marginBottom: "10px"}} id="standard-basic" label="UserName" />
                      <TextField type="email" required value={handleSignUpEmailChange} onChange={setHandleSignUpEmailChange} style={{marginTop: "5px", marginBottom: "10px"}} id="standard-basic" label="Email" />
                      <TextField type="password" required value={handleSignUpPassChange} onChange={setHandleSignUpPassChange} style={{marginTop: "5px", marginBottom: "25px"}} id="standard-basic" label="Password" />
                     <button style={{backgroundColor: "transparent", border: "none", outline: "none"}}>
                       <Button style={{width: "100%"}}  variant="contained" color="primary">Log In</Button>
                     </button>
                      
                    </form>
                  </div>
                </Fade>
              </Modal>


{/********************************* Sign Up Modal ****************************************************/}
            </Menu>
          </div>

        {/* Extra Div */}
        </div>
      </nav>
    {/* Navbar */}

      <div className="container">
        <h1>Instagram react Clone</h1>

        {
          posts.map(post => <Post key={post.id} id={post.id} {...(post.data)} />  )
        }

      </div>
    </div>
  );
}

export default App;
