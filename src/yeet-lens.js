// ROOT
export const rootGetter = state => state;
export const rootSetter = (arg, state) => {
  if (typeof arg === "function") {
    return arg(state);
  }
  return arg;
};
export const rootLens = [rootGetter, rootSetter];

// ARRAY
export const arrayGetter = (i, state) => rootGetter(state[i]);
export const arraySetter = (i, arg, state) =>
  state.map((item, index) => {
    if (index === i) {
      return rootSetter(arg, item);
    }
    return item;
  });
export const arrayLens = [arrayGetter, arraySetter];

// OBJECT
export const keyGetter = (key, state) => rootGetter(state[key]);
export const keySetter = (key, arg, state) => ({
  ...state,
  [key]: rootSetter(arg, state[key])
});
export const keyLens = [keyGetter, keySetter];
