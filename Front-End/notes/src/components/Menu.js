import React from "react";

export default function Menu({ onNew, onSearch }) {

  const handleChange = (e) =>{
    onSearch(e)
  }
  return (
    <div className="menu">
      <input className="search" placeholder="Search..." onChange={handleChange}/>
      <button className="btn" onClick={(e) => onNew()}>
        Add notes
      </button>
    </div>
  );
}
