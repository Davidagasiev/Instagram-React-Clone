import React from "react";
import "./CommentsList.css";
import useToggle from "./Hooks/useToggle";

import {v4 as uuid} from "uuid";

function CommentsList(props) {
    const [showComments, setShowComments] = useToggle(false);
    const comments = JSON.parse(props.comments);
    return (
        <div className="CommentsList">
            {!showComments ?
                (<button onClick={setShowComments} className="commentsList_togglecomments">View All {comments.length} Comments</button>)
                :
                (<>
                    <ul>
                        {comments.map(comment => (<li key={uuid()} style={{margin: "15px 0"}}><p style={{wordBreak: "break-word"}}>
                            <span>{comment.user}</span>
                            {comment.comment}
                        </p></li>))
                        
                        }
                    </ul>
                    <button onClick={setShowComments} className="commentsList_togglecomments">Hide All Comments</button>
               </> 
            )}
       
        </div>
    )
}

export default CommentsList;