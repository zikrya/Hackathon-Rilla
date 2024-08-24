// app/components/Navbar.tsx
import React from 'react';
import Link from 'next/link'; // Import Next.js Link component
import './Navbar.css'; // Ensure your styles are imported correctly

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-link" href="/upload">
        Upload
      </Link>
      <span className="navbar-separator"> | </span>
      <Link className="navbar-link" href="/view">
        View
      </Link>
    </nav>
  );
}

export default Navbar;
