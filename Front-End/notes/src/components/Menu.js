import React, {useContext} from "react";
import ItemsContext from "./ItemsContext";

export default function Menu() {
  const itemsContext = useContext(ItemsContext);

  const handleClick = () => {
    itemsContext.onNew();
  };

  const handleChange = (e) => {
    itemsContext.onSearch(e);
  };
  return (
    <div className="menu">
      <input
        className="search"
        placeholder="Search..."
        onChange={handleChange}
      />
      <button className="btn" onClick={() => handleClick()}>
        Add notes
      </button>
    </div>
  );
}
