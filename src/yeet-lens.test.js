import * as L from "./yeet-lens";

describe("root", () => {
  const atomState = "cat";
  test("root getter", () => {
    expect(L.rootGetter(atomState)).toBe("cat");
  });
  test("root setter with value", () => {
    expect(L.rootSetter("dog")(atomState)).toBe("dog");
  });
  test("root setter with function", () => {
    expect(L.rootSetter(state => state + "s")(atomState)).toBe("cats");
  });
});

describe("array", () => {
  const atomState = [1, 2, 3];
  test("array getter", () => {
    expect(L.arrayGetter(1)(atomState)).toBe(2);
  });
  test("array setter with value", () => {
    expect(L.arraySetter(1, "dog")(atomState)).toEqual([1, "dog", 3]);
  });
  test("root setter with function", () => {
    expect(L.arraySetter(1, state => state + 1)(atomState)).toEqual([1, 3, 3]);
  });
});

describe("object", () => {
  const atomState = { a: 1 };
  test("key getter", () => {
    expect(L.keyGetter("a")(atomState)).toBe(1);
  });
  test("key setter with value", () => {
    expect(L.keySetter("a", 3)(atomState)).toEqual({ a: 3 });
  });
  test("key setter with function", () => {
    expect(L.keySetter("a", state => state + 1)(atomState)).toEqual({ a: 2 });
  });
});

describe("complex", () => {
  const atomState = { a: [{ b: 1 }] };
  test("composing getters", () => {
    const bGetter = L.keyGetter("b");
    const firstGetter = L.arrayGetter(0);
    const aGetter = L.keyGetter("a");
    const complexGetter = L.composeGetter(aGetter, firstGetter, bGetter);
    expect(complexGetter(atomState)).toBe(1);
  });
});
