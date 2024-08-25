import React, { useState } from 'react';
import './CommentForm.css';

type CommentFormProps = {
  transcriptId: string;
  userId: string;
  onAddComment: (comment: { transcriptId: string; userId: string; commentText: string }) => void;
  onSaveEdit: (text: string) => void;
  editingIndex: number | null;
  currentText: string;
  onCancelEdit: () => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  transcriptId,
  userId,
  onAddComment,
  onSaveEdit,
  editingIndex,
  currentText,
  onCancelEdit
}) => {
  const [text, setText] = useState(currentText);

  const handleSubmit = async () => {
    if (text.trim() === '') return;

    const comment = { transcriptId, userId, commentText: text };

    if (editingIndex !== null) {
      onSaveEdit(text);
    } else {
      try {
        await onAddComment(comment); // Call onAddComment with the comment object
      } catch (error) {
        console.error('Error adding comment:', error);
      }
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
