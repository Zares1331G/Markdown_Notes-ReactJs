import React from "react";

export default function Item({item}) {
  return (
    <div key={item.id} className="note">
      <div>
        {item.title === "" ? "[no title]" : item.title.substring(0, 20)}
      </div>
      <div>
        <button className="pinButton">{item.pinned ? "Pinned" : "Pin"}</button>
      </div>
    </div>
  );
}
