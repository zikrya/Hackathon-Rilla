"use client";

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { HiUpload } from "react-icons/hi";
import './DropZoneComponent.css';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin, DefaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



const DropZoneComponent = () => {

  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  const defaultLayoutPluginInstance: DefaultLayoutPlugin = defaultLayoutPlugin();

  const onDrop = useCallback ((acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      if (acceptedFiles.length > 0) { 
        const file = acceptedFiles[0]; 
        const url = URL.createObjectURL(file); 
        console.log(file);
        console.log(url);
        setFileUrl(url);
      }

    }, []);

  const { getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div className="dropzone-container">
      <h1 className="dropzone-title">Let's see your transcript.</h1>
      {!fileUrl ? (
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <HiUpload className="dropzone-icon" size={48} />
          <p className="dropzone-text">Upload Files Here</p>
        </div>
      ) : (
        <div
          style={{
            marginTop: '400px',
            height: '1100px',
            width: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default DropZoneComponent;