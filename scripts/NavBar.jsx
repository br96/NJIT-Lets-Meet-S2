import React from 'react';

import {NavBarTopButtons} from './NavBar/NavBarTopButtons';
export default function NavBar() {
  return (
    <div className="njit-header">
      <h4 className="njit-banner">NJIT</h4>
      <h1 className="app-name">Let&apos;s Meet</h1>
      <NavBarTopButtons />
    </div>
  );
}
