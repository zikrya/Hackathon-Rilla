import React from 'react';
import './TwoColumnLayout.css';

const TwoColumnLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leftContent, rightContent] = React.Children.toArray(children);

  return (
    <div className="container">
      <div className="left-column">
        {leftContent} {/* left side content */}
      </div>
      <div className="right-column">
        {rightContent} {/* right side content */}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
