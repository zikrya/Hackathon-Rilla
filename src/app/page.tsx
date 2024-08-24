'use client'
import React, { useState } from 'react';

export default function Home() {
  const [transcriptId, setTranscriptId] = useState('');
  const [userId, setUserId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcriptId,
          userId,
          commentText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Comment added successfully!');
        setTranscriptId('');
        setUserId('');
        setCommentText('');
      } else {
        setMessage('Failed to add comment.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <main>
      <h1>Hackaton 2024</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Transcript ID:</label>
          <input
            type="text"
            value={transcriptId}
            onChange={(e) => setTranscriptId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Comment</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
