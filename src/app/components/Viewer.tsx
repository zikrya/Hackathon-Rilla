"use client";

import React, { useState, useEffect } from 'react';
import './Viewer.css';

interface Transcript {
  transcriptId: string;
  title: string;
  content: string;
  createdAt: string;
}

const Viewer: React.FC = () => {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await fetch('/api/getAllTranscriptions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTranscripts(data.transcriptions || []);
      } catch (error) {
        console.error('Error fetching transcripts:', error);
      }
    };

    fetchTranscripts();
  }, []);

  const handleTranscriptClick = async (transcript: Transcript) => {
    setSelectedTranscript(transcript);
    setSummary(null); // Clear the previous summary
    setIsLoading(true); // Set loading to true

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: transcript.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setSummary(data.summary || '');
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Error fetching summary.');
    } finally {
      setIsLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="container">
      <div className="viewer-container">
        <div className="transcript-list">
          <h2>Available Transcripts</h2>
          <div className="transcript-buttons">
            {transcripts.length > 0 ? (
              transcripts.map(transcript => (
                <button
                  key={transcript.transcriptId}
                  onClick={() => handleTranscriptClick(transcript)}
                  className="transcript-button"
                >
                  {transcript.title}
                </button>
              ))
            ) : (
              <p>No transcripts available</p>
            )}
          </div>
        </div>

        <div className="transcript-details">
          {selectedTranscript && (
            <>
              <h2>{selectedTranscript.title}</h2>
              <p>{selectedTranscript.content}</p>
            </>
          )}
        </div>

        <div className="transcript-summary">
          {isLoading && (
            <div className="loading-message">
              <p>Generating summary...</p>
            </div>
          )}

          {summary && !isLoading && (
            <>
              <h2>Summary</h2>
              <p>{summary}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewer;
