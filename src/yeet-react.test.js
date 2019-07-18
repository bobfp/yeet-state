jest.mock("react", () => ({
  useContext: jest.fn(),
  createContext: jest.fn()
}));

import { useSetter, YeetContext } from "./yeet-react.js";
import { useContext } from "react";
import { createStore } from "./yeet-state.js";

describe("useSetter", () => {
  let store;
  beforeEach(() => {
    store = createStore({ a: 1 });
    useContext.mockReturnValue(store);
  });
  it("should call publish with 1 arity transformer", () => {
    const setState = useSetter("a")(newState => oldState => newState);
    setState(2);
    expect(useContext.mock.calls[0][0]).toEqual(YeetContext);
    expect(store.getAtom("a")).toBe(2);
  });
  it("should call publish from 2 arity transformer", () => {
    const setState = useSetter("a")(number => newState => oldState =>
      newState + number
    );
    setState(1)(2);
    expect(useContext.mock.calls[0][0]).toEqual(YeetContext);
    expect(store.getAtom("a")).toBe(3);
  });
});
