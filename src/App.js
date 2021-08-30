import { useState } from "react";
import Panel from "./components/Panel";
import Menu from "./components/Menu";
import List from "./components/List";
import Item from "./components/Item";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import uuid from "react-uuid";

function App() {
  const [items, setItems] = useState([]);
  const [copyItems, setCopyItems] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);

  const handleNew = () => {
    const note = {
      id: uuid(),
      title: "Este es el titulo",
      text: "Funcioan",
      pinned: false,
      created: Date.now(),
    };

    setItems([...items, note]);
  };
  const handlePinned = () => {};

  const handleSelectNote = (item, e) => {
    if (!e.target.classList.contains("note")) return;

    const index = items.findIndex((x) => x === item);

    setActualIndex(index);
  };

  const onChangeTitle = (e) => {
    const title = e.target.value;

    let notes = [...items];
    notes[actualIndex].title = title;

    setItems(notes);
  };

  const onChangeText = (e) => {
    const text = e.target.value;

    let notes = [...items];
    notes[actualIndex].text = text;

    setItems(notes);
  };

  const renderEditiorAndPreviewUI = () => {
    return (
      <>
        <Editor
          item={items[actualIndex]}
          onChangeTitle={onChangeTitle}
          onChangeText={onChangeText}
        />
        <Preview text={items[actualIndex].text} />
      </>
    );
  };

  return (
    <div className="App container">
      <Panel>
        <Menu onNew={handleNew} />
        <List>
          {items.map((item, i) => {
            return (
              <Item
                key={item.id}
                actualIndex={actualIndex}
                item={item}
                index={i}
                onHandlePinned={handlePinned}
                onHandleSelectNote={handleSelectNote}
              />
            );
          })}
        </List>
      </Panel>
      <>{actualIndex >= 0 ? renderEditiorAndPreviewUI() : ""}</>
    </div>
  );
}

export default App;
