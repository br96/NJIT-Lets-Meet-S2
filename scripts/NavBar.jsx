import React from 'react';

import {NavBarTopButtons} from './NavBar/NavBarTopButtons';
export default function NavBar() {
  return (
    <div className="njit-header">
      <h4 className="njit-banner">NJIT</h4>
      <h1 className="app-name">LET&apos;S MEET</h1>
      <div className="navbar-directory">
        <div className="home-directory">HOME</div>
        <div className="about-directory">ABOUT</div>
        <NavBarTopButtons />
      </div>
    </div>
  );
}
