import React from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import './globals.css';
import Footer from './components/Footer';
import TopHeader from './components/TopHeadert';

export const metadata = {
  title: 'Rilla Comments',
  description: 'Comment on Rilla transcripts',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userId = "exampleUserId";

  return (
    <html lang="en">
      <body>
        <div className="App">
          <TopHeader userId={userId} />
          <Navbar />
          <Background />
            <main>
              {children}
            </main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
