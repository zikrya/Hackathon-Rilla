"use client";

import React, { useState } from 'react';
import TwoColumnLayout from '../components/TwoColumnLayout';
import DropZoneComponent from '../components/DropZoneComponent';
import CommentSection from '../components/CommentSection';

interface Transcript {
  transcriptId: string;
  title: string;
  content: string;
  createdAt: string;
}

const UploadPage: React.FC = () => {
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  const handleTranscriptSelection = async (transcript: Transcript) => {
    setSelectedTranscript(transcript);

    try {
      const response = await fetch(`/api/getTranscriptionsWithComments?transcriptId=${transcript.transcriptId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching transcript with comments:', error);
    }
  };

  return (
    <TwoColumnLayout leftHeader="Transcript" rightHeader="Comments">
      <DropZoneComponent onSelectTranscript={handleTranscriptSelection} />
      {selectedTranscript && <CommentSection comments={comments} />}
    </TwoColumnLayout>
  );
};

export default UploadPage;
