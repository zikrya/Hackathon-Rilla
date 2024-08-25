"use client";

import React, { useState } from 'react';
import CommentsList from './CommentList';
import CommentForm from './CommentForm';
import './CommentSection.css';

interface CommentData {
  commentId: string;
  transcriptId: string;
  userId: string;
  commentText: string;
  createdAt: string;
}

const CommentSection = ({ comments }: { comments: CommentData[] }) => {
  const [localComments, setLocalComments] = useState<CommentData[]>(comments);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleAddComment = (text: string) => {
    if (text.trim() === '') return;
    const newComment = {
      commentId: `temp-${Date.now()}`,
      transcriptId: '',
      userId: '',
      commentText: text,
      createdAt: new Date().toISOString(),
    };
    setLocalComments([...localComments, newComment]);
  };

  const handleSaveEdit = (text: string) => {
    if (text.trim() === '') return;
    setLocalComments(localComments.map((comment, index) =>
      index === editingIndex ? { ...comment, commentText: text } : comment
    ));
    setEditingIndex(null);
    setEditText('');
  };

  const handleDeleteComment = (index: number) => {
    setLocalComments(localComments.filter((_, i) => i !== index));
  };

  const handleEditComment = (index: number) => {
    setEditingIndex(index);
    setEditText(localComments[index].commentText);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  return (
    <div className="comment-section">
      <CommentsList comments={localComments} />
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
