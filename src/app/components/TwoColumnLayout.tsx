import React from 'react';
import './TwoColumnLayout.css';
import TwoHeader from './TwoHeader';

interface TwoColumnLayoutProps {
  leftHeader?: string;
  rightHeader?: string;
  children: React.ReactNode;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ leftHeader, rightHeader, children }) => {
  const [leftContent, rightContent] = React.Children.toArray(children);

  return (
    <div className="container">
      <div className="left-column">
        {leftHeader && <TwoHeader title={leftHeader} />}
        {leftContent}
      </div>
      <div className="right-column">
        {rightHeader && <TwoHeader title={rightHeader} />}
        {rightContent}
      </div>
    </div>
  );
};

export default TwoColumnLayout;
