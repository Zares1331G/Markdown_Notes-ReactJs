import React from "react";

export default function Menu({ onNew }) {
  return (
    <div className="menu">
      <input className="search" placeholder="Search..." />
      <button className="btn" onClick={(e) => onNew()}>
        Add notes
      </button>
    </div>
  );
}
