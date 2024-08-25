import React from 'react';
import TwoColumnLayout from '../components/TwoColumnLayout'; // Adjust the import path if necessary
import DropZoneComponent from '../components/DropZoneComponent';
import CommentSection from '../components/CommentSection';

const UploadPage: React.FC = () => {
  return (
    <TwoColumnLayout leftHeader="Transcript" rightHeader="Comments">
      <div className="left-side">
        <DropZoneComponent />
      </div>
      <div className="right-side">
        <CommentSection />
      </div>
    </TwoColumnLayout>
  );
};

export default UploadPage;
