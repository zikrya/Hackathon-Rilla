import React from 'react';
import TwoColumnLayout from '../components/TwoColumnLayout';
import DropZoneComponent from '../components/DropZoneComponent';
import CommentSection from '../components/CommentSection';

const UploadPage: React.FC = () => {
  return (
    <TwoColumnLayout leftHeader="Transcript" rightHeader="Comments">
      <div className="left-column">
        <DropZoneComponent />
      </div>
      <div className="right-column">
        <CommentSection />
      </div>
    </TwoColumnLayout>
  );
};

export default UploadPage;
