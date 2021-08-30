import React from "react";

export default function Item({
  item,
  index,
  onHandlePinned,
  onHandleSelectNote,
  actualIndex,
}) {
  const handlePinned = (item, index) => {
    onHandlePinned(item, index);
  };

  const handleClick = (item, e) => {
    onHandleSelectNote(item, e);
  };

  return (
    <div key={item.id} className={index === actualIndex ? "note activeNote" : "note"} onClick={(e) => handleClick(item, e)}>
      <div>
        {item.title === "" ? "[no title]" : item.title.substring(0, 20)}
      </div>
      <div>
        <button
          className="pinButton"
          onClick={(e) => handlePinned(item, index)}
        >
          {item.pinned ? "Pinned" : "Pin"}
        </button>
      </div>
    </div>
  );
}
