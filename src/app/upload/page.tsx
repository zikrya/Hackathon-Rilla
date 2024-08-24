import React from 'react';
import TwoColumnLayout from '../components/TwoColumnLayout'; // Adjust the import path if necessary
import DropZoneComponent from '../components/DropZoneComponent';
import CommentComponent from '../components/CommentSection';

const UploadPage: React.FC = () => {
  return (
    <TwoColumnLayout>
      <div className="left-side">
        <DropZoneComponent />
        {/* You can add more components to the left side here */}
      </div>
      <div className="right-side">
        <CommentComponent />
        {/* You can add more components to the right side here */}
      </div>
    </TwoColumnLayout>
  );
};

export default UploadPage;
