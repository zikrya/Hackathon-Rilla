import React from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import './globals.css';

export const metadata = {
  title: 'Rilla Comments',
  description: 'Comment on Rilla transcripts',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <Navbar />
          <Background />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
