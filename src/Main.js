import React from "react";
import PostList from "./PostList";
import mergeSort from "./Hooks/mergeSort"

import InstagramEmbed from 'react-instagram-embed';


function Main(props) {
    return (
        <>
            
          {/* Post List */}
          <PostList posts={mergeSort(props.posts)} />
          {/* Post List */}


{/**************************** Instagram Sidebar 8*************************************/}
            <div className="embed">
              <div className="embed2">
                <InstagramEmbed
                  url='https://www.instagram.com/p/CEKeX08MKxy/'
                  maxWidth={400}
                  hideCaption={false}
                  containerTagName='div'
                  protocol=''
                  injectScript
                />
              </div>
            </div>
{/**************************** Instagram Sidebar 8*************************************/}
        </>
    )
}

export default Main;