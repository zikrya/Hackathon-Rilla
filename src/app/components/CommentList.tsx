//*comment list
"use client";

import React from 'react';
import './CommentList.css';

interface Comment {
  commentId: string;
  commentText: string;
}

interface CommentsListProps {
  comments?: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments = [] }) => {
  return (
    <div className="comments-list">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.commentId} className="comment-item">
            <p>{comment.commentText}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsList;
