import React from "react";

export default function Menu({setItems, items}) {
  const handleClick = () => {
    const note = {
      id: 2,
      title: "mi tercera nota",
      text: "# hola a todos",
      pinned: false,
      created: Date.now(),
    };

    setItems([...items, note]);
  };
  return (
    <div className="menu">
      <input className="search" placeholder="Search..." />
      <button className="btn" onClick={(e) => handleClick()}>
        Add notes
      </button>
    </div>
  );
}
