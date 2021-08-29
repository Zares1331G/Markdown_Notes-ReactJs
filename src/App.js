import { useState } from "react";

const initialState = [{}];

function App() {
  const [items, setItems] = useState(initialState);

  return (
    <div className="App container">
      <div className="panel">
        <div className="menu">
          <input className="search" placeholder="Search..." />
          <button className="btn">Add notes</button>
          <div className="list"></div>
        </div>
      </div>
      <div>
        <div className="editor"></div>
        <div className="preview"></div>
      </div>
    </div>
  );
}

export default App;
