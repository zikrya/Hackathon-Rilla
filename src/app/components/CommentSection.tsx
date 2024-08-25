import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './CommentSection.css';

type Comment = {
  commentId: string;
  transcriptId: string;
  userId: string;
  commentText: string;
  createdAt: string;
};

const CommentSection: React.FC<{ transcriptId: string; userId: string }> = ({ transcriptId, userId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/getTranscriptionWithComments?transcriptId=${transcriptId}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [transcriptId]);

  const handleAddComment = async (comment: { transcriptId: string; userId: string; commentText: string }) => {
    try {
      const response = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) throw new Error('Failed to add comment');
      const newComment = await response.json();
      setComments((prev) => [...prev, newComment]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleSaveEdit = async (text: string) => {
    if (editingIndex === null) return;

    try {
      // Implement the edit comment logic here
      // e.g., sending a PUT request to an API endpoint to update the comment
      // After successful edit, update the state accordingly
      // For now, let's just clear the edit state
      setEditingIndex(null);
      setCurrentText('');
    } catch (error) {
      console.error('Error saving comment edit:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setCurrentText('');
  };

  const handleEditComment = (commentId: string) => {
    const commentToEdit = comments.find(comment => comment.commentId === commentId);
    if (commentToEdit) {
      setEditingIndex(comments.indexOf(commentToEdit));
      setCurrentText(commentToEdit.commentText);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/deleteComment?commentId=${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete comment');
      setComments(comments.filter(comment => comment.commentId !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h2 className="comment-section-title">Comments</h2>
      <CommentForm
        transcriptId={transcriptId}
        userId={userId}
        onAddComment={handleAddComment}
        onSaveEdit={handleSaveEdit}
        editingIndex={editingIndex}
        currentText={currentText}
        onCancelEdit={handleCancelEdit}
      />
      <CommentList
        comments={comments}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default CommentSection;
