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

    let notes = [...items];

    notes.unshift(note);

    let res = getOrderesNotes(notes);

    setItems(res);
  };
  const handlePinned = (item, i) => {
    setActualIndex(i);

    let id = item.id;
    let notes = [...items];
    notes[i].pinned = !notes[i].pinned;

    let res = getOrderesNotes(notes);

    setItems(res);

    let index = res.findIndex((x) => x.id === id);

    setActualIndex(index);
  };

  const getOrderesNotes = (arr) => {
    let items = [...arr];
    let pinned = items.filter((x) => x.pinned === true);
    let rest = items.filter((x) => x.pinned === false);

    pinned = sortByDate(pinned, true);
    rest = sortByDate(rest, true);

    return [...pinned, ...rest];
  };

  const sortByDate = (arr, asc = false) => {
    if (asc)
      return arr.sort((a, b) => new Date(b.created) - new Date(a.created));
    return arr.sort((a, b) => new Date(a.created) - new Date(b.created));
  };

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
