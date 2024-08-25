import React from 'react';
import './CommentsList.css';

interface CommentsListProps {
  comments: string[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="comments-list">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="comment-item">
            {comment}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsList;
