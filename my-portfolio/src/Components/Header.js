import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li><Link className="nav-link" to="/">About</Link></li>
          <li><Link className="nav-link" to="/skills">Skills</Link></li>
          <li><Link className="nav-link" to="/education">Education</Link></li>
          <li><Link className="nav-link" to="/achievements">Achievements</Link></li>
          <li><Link className="nav-link" to="/experience">Experience</Link></li>
          <li><Link className="nav-link" to="/projects">Projects</Link></li>
          <li><Link className="nav-link" to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
