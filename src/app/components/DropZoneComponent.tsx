"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileAdd } from "react-icons/ai";
import './DropZoneComponent.css';
import { PiFilePdfThin } from "react-icons/pi";
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

const DropZoneComponent = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      console.log(file);
      console.log(url);
      setFileUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="dropzone-container">
      <h1 className="dropzone-title">Let's see your transcript.</h1>
      {!fileUrl ? (
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
        <div
          style={{
            marginTop: '400px',
            height: '930px',
            width: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Document file={fileUrl} onLoadSuccess={({ numPages }) => console.log(`Loaded ${numPages} pages`)}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
    </div>
  );
};

export default DropZoneComponent;
