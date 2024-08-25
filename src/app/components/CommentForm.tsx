import React, { useState } from 'react';
import './CommentForm.css';

type CommentFormProps = {
  onAddComment: (text: string) => void;
  onSaveEdit: (text: string) => void;
  editingIndex: number | null;
  currentText: string;
  onCancelEdit: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  onAddComment,
  onSaveEdit,
  editingIndex,
  currentText,
  onCancelEdit
}) => {
  const [text, setText] = useState(currentText);

  const handleSubmit = () => {
    if (editingIndex !== null) {
      onSaveEdit(text);
    } else {
      onAddComment(text);
    }
    setText('');
  };

  return (
    <div className="comment-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleSubmit}>
        {editingIndex !== null ? 'Save' : 'Add Comment'}
      </button>
      {editingIndex !== null && (
        <button onClick={onCancelEdit}>Cancel</button>
      )}
    </div>
  );
};

export default CommentForm;
