"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import './topheader.css';

const Header: React.FC<{ userId: string }> = ({ userId }) => {
  const pathname = usePathname();

  const showNavbar = pathname === '/upload' || pathname === '/view';

  if (!showNavbar) {
    return null;
  }
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <header className="header">
      <span className="user-id">{userId}</span>
      <span className="divider">|</span>
      <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
    </header>
  );
};

export default Header;
