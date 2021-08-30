import { useState } from "react";
import Panel from "./components/Panel";
import Menu from "./components/Menu";
import List from "./components/List";
import Item from "./components/Item";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

function App() {
  const [items, setItems] = useState([
    {
      id: 2,
      title: "mi tercera nota",
      text: "# hola a todos",
      pinned: false,
      created: Date.now(),
    },
  ]);

  return (
    <div className="App container">
      <Panel>
        <Menu items={items} setItems={setItems} />
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
