import React, { useContext } from "react";
import ItemsContext from "./ItemsContext";

export default function NavBar() {
  const itemsContext = useContext(ItemsContext);

  const handleClick = () => {
    itemsContext.onNew();
  };

  const handleClickCloseNote = () => {
    itemsContext.actualIndex(-1)
  }
  return (
    <div className="navBar">
      MyNotes.com
      <div>
        <button className="btn-close" onClick={() =>handleClickCloseNote()}>
          Close notes
        </button>
        <button className="btn" onClick={() => handleClick()}>
          Add notes
        </button>
      </div>
    </div>
  );
}
