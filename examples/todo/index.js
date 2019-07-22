import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { createStore } from "../../src/yeet-state.js";
import {
  useGetter,
  useSetter,
  useYeet,
  YeetContext
} from "../../src/yeet-react.js";

const ToDoInput = () => {
  const [text, setText] = useState("");
  const addToDo = useSetter("todos")(concatSetter);
  const handleText = useCallback(e => setText(e.target.value), []);
  const handleEnter = useCallback(e => {
    if (e.keyCode == 13) {
      addToDo(newToDo(e.target.value));
      setText("");
    }
  }, []);
  return (
    <input
      type="text"
      value={text}
      onKeyDown={handleEnter}
      onChange={handleText}
    />
  );
};

const ToDo = React.memo(({ toggleComplete, toDo }) => {
  const style = toDo.complete ? { textDecoration: "line-through" } : null;
  return (
    <li style={style} onClick={toggleComplete}>
      {toDo.text}
    </li>
  );
});

const ToDoList = () => {
  const [toDos, updateToDoAtIndex] = useYeet("todos")(arrayLens);
  const toggleComplete = i => () => updateToDoAtIndex(transformComplete, i);

  return (
    <ul>
      {toDos.map((toDo, i) => (
        <ToDo
          key={i.toString()}
          toDo={toDo}
          toggleComplete={toggleComplete(i)}
        />
      ))}
    </ul>
  );
};

const rootGetter = state => state;
const rootSetter = (newState, _) => newState;
const concatSetter = (item, items) => [...items, item];
const itemSetter = (transformer, index, items) =>
  items.map((item, i) => (i === index ? transformer(item) : item));
const arrayLens = [rootGetter, itemSetter];

const transformComplete = item => ({ ...item, complete: !item.complete });
const newToDo = text => ({ text, complete: false });
const todos = [{ text: "Item 1", complete: false }];
const filter = "SHOW_ALL";

const App = () => {
  const initValue = { todos, filter };
  const store = createStore(initValue);
  return (
    <YeetContext.Provider value={store}>
      <ToDoInput />
      <ToDoList />
    </YeetContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
