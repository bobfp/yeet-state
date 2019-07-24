import { createStore } from "../src/index.js";

describe("store", () => {
  it("should return value when getAtom is called", () => {
    const initialValue = { a: "cat" };
    const store = createStore(initialValue);
    expect(store.getAtom("a")).toBe("cat");
  });
});

describe("pub/sub", () => {
  it("should do the pub/sub and then stop doing the pub/sub", () => {
    const initialValue = { a: 1 };
    const store = createStore(initialValue);
    const cbSpy = jest.fn();
    const transformerSpy = jest.fn(() => 2);
    const unsubscribe = store.subscribe("a")(cbSpy);
    store.publish("a")(transformerSpy);

    unsubscribe();
    store.publish("a")(transformerSpy);

    expect(cbSpy.mock.calls.length).toBe(1);
    expect(cbSpy.mock.calls[0][0]).toBe(2);
    expect(store.getAtom("a")).toEqual(2);
  });
});
