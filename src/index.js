import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  createStore,
  useYeet,
  YeetContext,
  useSetter,
  useGetter
} from "./yeet";

const counterLens = [
  state => state.counter,
  counter => state => ({ ...state, counter })
];

const CounterDisplay = () => {
  const counter = useGetter("root", counterLens[0]);
  return <span>{counter}</span>;
};

const Counter = () => {
  const yeetCounter = useSetter("root", val => state => ({
    ...state,
    counter: state.counter + val
  }));

  const handleUpdateCounter = useCallback(
    val => () => {
      yeetCounter(val);
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
  const [counter, setCounter] = useYeet("root", counterLens);
  return (
    <input
      type="text"
      value={counter}
      onChange={e => setCounter(Number(e.target.value))}
    />
  );
};

const App = () => {
  const root = { counter: 0 };
  const initValue = { root };
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
