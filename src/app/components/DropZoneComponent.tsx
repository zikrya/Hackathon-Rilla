"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { PiFilePdfThin } from 'react-icons/pi';
import './DropZoneComponent.css';

interface Transcript {
  transcriptId: string;
  title: string;
  content: string;
  createdAt: string;
}

const DropZoneComponent: React.FC<{ onSelectTranscript: (transcript: Transcript) => void }> = ({ onSelectTranscript }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await fetch('/api/getAllTranscriptions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.transcriptions) {
          setTranscripts(data.transcriptions);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching transcripts:', error);
      }
    };

    fetchTranscripts();
  }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);

    const title = file.name;
    const userId = 'user123';

    const reader = new FileReader();
    reader.onload = async () => {
      const content = reader.result as string;

      const requestData = {
        title,
        content,
        userId,
      };

      try {
        const response = await fetch('/api/addTranscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const result = await response.json();
        console.log('Transcription added:', result);

        const updatedResponse = await fetch('/api/getAllTranscriptions');
        if (!updatedResponse.ok) {
          throw new Error('Failed to fetch updated transcripts');
        }
        const updatedData = await updatedResponse.json();
        setTranscripts(updatedData.transcriptions || []);
        console.log('Updated transcripts:', updatedData.transcriptions);
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    };

    reader.readAsText(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);

      uploadFile(file);
    }
  }, []);

  const handleTranscriptSelection = async (transcript: Transcript) => {
    setShowList(false);
    onSelectTranscript(transcript);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="dropzone-container">
      {showList ? (
        <>
          {!fileName ? (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <PiFilePdfThin className="dropzone-icon" style={{ color: 'white' }} size={48} />
              <p className="dropzone-text">
                <AiOutlineFileAdd size={16} />
                CHOOSE FILES
              </p>
              <p className="dropzone-subtitle">or just drop them here</p>
            </div>
          ) : (
            <p className="file-uploaded">File "{fileName}" uploaded successfully.</p>
          )}
          {uploading && <p>Uploading...</p>}
          
          <div className="transcript-list">
            <h2>Uploaded Transcripts</h2>
            <ul>
              {transcripts.length > 0 ? (
                transcripts.map(transcript => (
                  <li key={transcript.transcriptId} onClick={() => handleTranscriptSelection(transcript)}>
                    {transcript.title}
                  </li>
                ))
              ) : (
                <p>No transcripts available</p>
              )}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DropZoneComponent;
