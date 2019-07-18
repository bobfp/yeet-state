export const createStore = initialValue => {
  let store = initialValue;
  let callbacks = Object.keys(initialValue).reduce(
    (cbs, atom) => ({
      ...cbs,
      [atom]: {}
    }),
    {}
  );
  const getAtom = atom => store[atom];

  const subscribe = atom => cb => {
    const cbID = Symbol(atom);
    callbacks[atom][cbID] = cb;
    return () => {
      delete callbacks[atom][cbID];
    };
  };

  const publish = atom => transformer => {
    const newState = transformer(store[atom]);
    store[atom] = newState;
    const cbIDs = Object.getOwnPropertySymbols(callbacks[atom]);
    cbIDs.forEach(cbID => {
      callbacks[atom][cbID](store[atom]);
    });
  };

  return { getAtom, subscribe, publish };
};
