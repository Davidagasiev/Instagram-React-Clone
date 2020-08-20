import React, {useState} from "react";
import "./CommentsList.css";
import useToggle from "./Hooks/useToggle";

function CommentsList(props) {
    const [showComments, setShowComments] = useToggle(false);

    return (
        <div className="CommentsList">
            {!showComments ?
                (<button onClick={setShowComments} className="commentsList_togglecomments">View All {props.comments.length} Comments</button>)
                :
                (<>
                    <ul>
                        {props.comments.map(comment => (<li style={{margin: "15px 0"}}><p>
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