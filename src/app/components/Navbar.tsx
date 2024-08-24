import React from 'react';
import Link from 'next/link';
import './Navbar.css';

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
