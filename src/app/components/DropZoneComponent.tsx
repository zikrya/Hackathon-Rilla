"use client";

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { HiUpload } from "react-icons/hi";
import './DropZoneComponent.css';

const DropZoneComponent = () => {
  
  const onDrop = useCallback ((acceptedFiles: any) => {
      console.log(acceptedFiles);
    }, []);

  const { getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div className="dropzone-container">
        <h1 className="dropzone-title">Let's see your transcript.</h1>
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()}/>
            <HiUpload className="dropzone-icon" size={48} />
            <p className="dropzone-text">Upload Files Here</p>
        </div>
    </div>
  )
}
export default DropZoneComponent;