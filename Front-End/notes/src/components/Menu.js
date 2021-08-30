import React, {useContext} from "react";
import ItemsContext from "./ItemsContext";

export default function Menu() {
  const itemsContext = useContext(ItemsContext);

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
      
    </div>
  );
}
