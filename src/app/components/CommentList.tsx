import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import './CommentList.css'; // Ensure you have the correct path for your CSS file

type Comment = {
  commentId: string;
  transcriptId: string;
  userId: string;
  commentText: string;
  createdAt: string;
};

type CommentListProps = {
  comments: Comment[];
  onEditComment: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
};

const CommentList: React.FC<CommentListProps> = ({ comments, onEditComment, onDeleteComment }) => (
  <div className="comment-list">
    <div className="comments-container">
      {comments.map(comment => (
        <div key={comment.commentId} className="comment">
          <p>{comment.commentText}</p>
          <small>By {comment.userId} on {new Date(comment.createdAt).toLocaleDateString()}</small>
          <div className="comment-actions">
            <FaEdit className="icon edit-icon" onClick={() => onEditComment(comment.commentId)} />
            <FaTrash className="icon delete-icon" onClick={() => onDeleteComment(comment.commentId)} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CommentList;
