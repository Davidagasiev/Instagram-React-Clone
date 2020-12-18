import React from "react";

import PostList from "./PostGrid/PostList";
import mergeSort from "./Hooks/mergeSort"

import "./Main.css";

const Main = (props) => {
  return (
    <>
      {/* Post List */}
      <PostList posts={mergeSort(props.posts)} />
      {/* Post List */}


      {/**************************** Instagram Sidebar 8*************************************/}
      <div className="embed">
        <div className="embed2">
          <p className="find">Find me on:</p>

          <ul className="links">
            <li>
              <a href="https://www.linkedin.com/in/david-agasiev/" target="_blank">
                <img alt="LinkedIn Logo" src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-linkedin-circle-512.png" />
              </a>
            </li>

            <li >
              <a href="https://github.com/Davidagasiev" target="_blank">
                <img alt="Github Logo" src="https://cdn0.iconfinder.com/data/icons/octicons/1024/mark-github-512.png" />
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/david_agas/" target="_blank">
                <img alt="Instagram Logo" src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-circle-512.png" />
              </a>
            </li>

            <li>
              <a href="https://www.facebook.com/DavidAgasiev" target="_blank">
                <img alt="Facebook Logo" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-circle-512.png" />
              </a>
            </li>
          </ul>

          <p className="messengerP">Also check my Messenger Clone</p>
          <div className="messengerClone">
            <a href="https://facebook-messenger-react-clone.web.app/" target="_blank">
              <img alt="Messenger Logo" src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399" />
            </a>
          </div>
        </div>
      </div>
      {/**************************** Instagram Sidebar 8*************************************/}
    </>
  )
}

export default Main;