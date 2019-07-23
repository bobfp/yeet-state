import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { createStore } from "../../src/yeet-state";
import {
  YeetContext,
  useGetter,
  useSetter,
  useYeet
} from "../../src/yeet-react";
import { rootGetter, rootSetter, rootLens } from "../../src/yeet-lens";

const CounterDisplay = () => {
  const counter = useGetter("counter")(rootGetter);
  return <span>{counter}</span>;
};

const Counter = () => {
  const yeetCounter = useSetter("counter")(rootSetter);

  const handleUpdateCounter = useCallback(
    val => () => {
      yeetCounter(state => state + val);
    },
    []
  );
  return (
    <div>
      <button onClick={handleUpdateCounter(1)}>+</button>
      <button onClick={handleUpdateCounter(-1)}>-</button>
    </div>
  );
};

const CounterInput = () => {
  const [counter, setCounter] = useYeet("counter")(rootLens);
  return (
    <input
      type="text"
      value={counter}
      onChange={e => setCounter(Number(e.target.value))}
    />
  );
};

const App = () => {
  const counter = 0;
  const initValue = { counter };
  const store = createStore(initValue);
  return (
    <YeetContext.Provider value={store}>
      <CounterDisplay />
      <Counter />
      <CounterInput />
    </YeetContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
