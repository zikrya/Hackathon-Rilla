import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './Comment.css';

type CommentProps = {
  text: string;
  onEdit: () => void;
  onDelete: () => void;
};

const Comment: React.FC<CommentProps> = ({ text, onEdit, onDelete }) => {
  return (
    <div className="comment">
      <p>{text}</p>
      <div className="comment-actions">
        <button onClick={onEdit} className="comment-action-button">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="comment-action-button">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default Comment;

