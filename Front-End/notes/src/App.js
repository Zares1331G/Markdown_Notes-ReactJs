import { useState, useEffect } from "react";
import Panel from "./components/Panel";
import Menu from "./components/Menu";
import List from "./components/List";
import Item from "./components/Item";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import uuid from "react-uuid";
import ItemsContext from "./components/ItemsContext";
import { get, post, put } from "./libs/http";
import StatusContext from "./components/StatusContext";

function App() {
  const URL = "http://localhost:3010/";

  const [items, setItems] = useState([]);
  const [copyItems, setCopyItems] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);

  const [lock, setLock] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getItems() {
    let data = await get(`${URL}`);
    let res = getOrderesNotes(data);

    setItems(res);
    setCopyItems(res);

    if (items.length > 0) setActualIndex(0);
  }

  async function handleNew() {
    const note = {
      id: uuid(),
      title: "[Title]",
      text: "[Text]",
      pinned: false,
      created: Date.now(),
    };

    let notes = [...items];

    notes.unshift(note);

    let res = getOrderesNotes(notes);

    setItems(res);
    setCopyItems(res);

    // eslint-disable-next-line
    const data = await post(`${URL}new`, note);
  }
  const handlePinned = (item, i) => {
    setActualIndex(i);

    let id = item.id;
    let notes = [...items];
    notes[i].pinned = !notes[i].pinned;

    let res = getOrderesNotes(notes);

    setItems(res);
    setCopyItems(res);

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
    setCopyItems(notes);
  };

  const onChangeText = (e) => {
    const text = e.target.value;

    let notes = [...items];
    notes[actualIndex].text = text;

    setItems(notes);
    setCopyItems(notes);
  };

  function autosave(){
    console.log('Entro en autoSave')
    if(!lock){
      setLock(true);
      setStatus(1);
      setTimeout(() =>{
        save();
      }, 3000)
    }
  }

  async function save(){
    console.log('Entro en Save')
    const item = items[actualIndex]
    
    // eslint-disable-next-line
    const response = await put(`${URL}update`, item)

    setStatus(2);

    setTimeout(() =>{
      setStatus(0)
    }, 1000)
  }

  const renderEditiorAndPreviewUI = () => {
    return (
      <>
        <StatusContext.Provider value={{status: status, autosave: autosave}}>
          <Editor
            item={copyItems[actualIndex]}
            onChangeTitle={onChangeTitle}
            onChangeText={onChangeText}
          />
        </StatusContext.Provider>
        <Preview text={copyItems[actualIndex].text} />
      </>
    );
  };

  const handleSearch = (e) => {
    const q = e.target.value;

    if (q === "") {
      setCopyItems([...items]);
    } else {
      let res = items.filter(
        (x) => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0
      );

      if (res.length === 0) {
        setActualIndex(-1);
      } else {
        setCopyItems([...res]);
        setActualIndex(0);
      }
    }
  };

  return (
    <div className="App container">
      <Panel>
        <ItemsContext.Provider
          value={{ onSearch: handleSearch, onNew: handleNew }}
        >
          <Menu />
        </ItemsContext.Provider>
        <List>
          {copyItems.map((item, i) => {
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
