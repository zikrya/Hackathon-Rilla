"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileAdd } from "react-icons/ai";
import './DropZoneComponent.css';
import { PiFilePdfThin } from "react-icons/pi";

const DropZoneComponent = () => {
  
  const onDrop = useCallback((acceptedFiles: any) => {
      console.log(acceptedFiles);
    }, []);

  const { getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div className="dropzone-container">
        <h1 className="dropzone-title">Let's see your transcript.</h1>
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()}/>
            <PiFilePdfThin className="dropzone-icon" size={48} />
            <p className="dropzone-text">
              <AiOutlineFileAdd size={16} />
              CHOOSE FILES
            </p>
        </div>
    </div>
  );
}

export default DropZoneComponent;
