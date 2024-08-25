"use client";

import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './CommentSection.css';

const CommentSection = () => {
  const [comments, setComments] = useState<string[]>([
    'one',
    'two',
    'three'
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleAddComment = (text: string) => {
    if (text.trim() === '') return;
    setComments([...comments, text]);
  };

  const handleSaveEdit = (text: string) => {
    if (text.trim() === '') return;
    setComments(comments.map((comment, index) =>
      index === editingIndex ? text : comment
    ));
    setEditingIndex(null);
    setEditText('');
  };

  const handleDeleteComment = (index: number) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const handleEditComment = (index: number) => {
    setEditingIndex(index);
    setEditText(comments[index]);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment
              key={index}
              text={comment}
              onEdit={() => handleEditComment(index)}
              onDelete={() => handleDeleteComment(index)}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <CommentForm
        onAddComment={handleAddComment}
        onSaveEdit={handleSaveEdit}
        editingIndex={editingIndex}
        currentText={editText}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

export default CommentSection;
