import React from 'react';

import {NavBarTopButtons} from './NavBar/NavBarTopButtons';
export default function NavBar() {
  return (
    <div className="njit-header">
      <h4 className="njit-banner">NJIT</h4>
      <h1 className="app-name">LET&apos;S MEET</h1>
      <div className="navbar-directory">
        <a className="normal-link" href="/home"><div className="home-directory">HOME</div></a>
        <a className="normal-link" href="/about"><div className="about-directory">ABOUT</div></a>
        <NavBarTopButtons />
      </div>
    </div>
  );
}
