"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const showNavbar = pathname === '/upload' || pathname === '/view';

  if (!showNavbar) {
    return null;
  }

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