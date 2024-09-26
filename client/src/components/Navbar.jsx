import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="container">
        <Link to="/">Millie-Workouts</Link>
      </nav>
    </header>
  );
};

export default Navbar;
