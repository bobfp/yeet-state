jest.mock("react", () => ({
  useContext: jest.fn(),
  useEffect: jest.fn((fn, deps) => {
    fn();
  }),
  createContext: jest.fn(),
  useState: jest.fn(state => [{}, jest.fn()])
}));

import { useSetter, useGetter, useYeet, YeetContext } from "./yeet-react.js";
import { useContext } from "react";
import { createStore } from "./yeet-state.js";

describe("useSetter", () => {
  let store;
  beforeEach(() => {
    store = createStore({ a: 1 });
    useContext.mockReturnValue(store);
  });
  it("should call publish with 1 arity transformer", () => {
    const setState = useSetter("a")((newState, oldState) => newState);
    setState(2);
    expect(useContext.mock.calls[0][0]).toEqual(YeetContext);
    expect(store.getAtom("a")).toBe(2);
  });
  it("should call publish from 2 arity transformer", () => {
    const setState = useSetter("a")(
      (number, newState, oldState) => newState + number
    );
    setState(1, 2);
    expect(useContext.mock.calls[0][0]).toEqual(YeetContext);
    expect(store.getAtom("a")).toBe(3);
  });
});

describe("useGetter", () => {
  let store;
  beforeEach(() => {
    store = createStore({ a: 1 });
    store.subscribe = jest.fn(state => getter => {});
    useContext.mockReturnValue(store);
  });
  it("should subscribe to the store", () => {
    const getter = jest.fn(state => state);
    const state = useGetter("a")(getter);
  });
});

describe("useYeet", () => {
  let store;
  beforeEach(() => {
    store = createStore({ a: 1 });
    useContext.mockReturnValue(store);
  });
  it("should subscribe to the store", () => {
    store.subscribe = jest.fn(state => getter => {});
    const getter = jest.fn(state => state);
    const setter = jest.fn(newState => state => newState);
    const [state, setState] = useYeet("a")([getter, setter]);
    expect(store.subscribe.mock.calls.length).toBe(1);
  });
});
