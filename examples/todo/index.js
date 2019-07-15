import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  createStore,
  useYeet,
  YeetContext,
  useSetter,
  useGetter
} from "../../src/yeet";

const ToDoInput = () => {
  const [text, setText] = useState("");
  const addToDo = useSetter("todos", todo => todos => [...todos, todo]);
  const handleEnter = useCallback(e => {
    if (e.keyCode == 13) {
      addToDo({ text: e.target.value, complete: false });
      setText("");
    }
  }, []);
  return (
    <input
      type="text"
      value={text}
      onKeyDown={handleEnter}
      onChange={e => setText(e.target.value)}
    />
  );
};

const ToDo = ({ toggleComplete, toDo }) => {
  const style = toDo.complete ? { textDecoration: "line-through" } : null;
  return (
    <li style={style} onClick={toggleComplete}>
      {toDo.text}
    </li>
  );
};

const ToDoList = () => {
  const [toDos, toggleComplete] = useYeet("todos", [
    todos => todos,
    index => todos =>
      toDos.map((toDo, i) =>
        i === index ? { ...toDo, complete: !toDo.complete } : toDo
      )
  ]);

  return (
    <ul>
      {toDos.map((toDo, i) => (
        <ToDo
          key={i.toString()}
          toDo={toDo}
          toggleComplete={() => toggleComplete(i)}
        />
      ))}
    </ul>
  );
};

const App = () => {
  const todos = [{ text: "Item 1", complete: false }];
  const filter = "SHOW_ALL";
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
