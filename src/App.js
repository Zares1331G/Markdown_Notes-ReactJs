import { useState } from "react";
import Panel from "./components/Panel";
import Menu from "./components/Menu";
import List from "./components/List";
import Item from "./components/Item";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import uuid from 'react-uuid'

function App() {
  const [items, setItems] = useState([]);

  const handleNew = () => {
    const note = {
      id: uuid(),
      title: '',
      text: '',
      pinned: false,
      created: Date.now(),
    };

    setItems([...items, note]);
  };

  return (
    <div className="App container">
      <Panel>
        <Menu onNew={handleNew} />
        <List>
          {items.map((item, i) => {
            return <Item key={item.id} item={item} />;
          })}
        </List>
      </Panel>
      <>
        <Editor />
        <Preview />
      </>
    </div>
  );
}

export default App;
