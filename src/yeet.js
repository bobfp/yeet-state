import React, { useContext, useEffect, useState } from "react";

export const createStore = initValue => {
  let value = initValue;
  let callBacks = {};
  Object.keys(initValue).forEach(atom => (callBacks[atom] = {}));

  const getCurrent = atom => () => value[atom];
  const subscribe = atom => cb => {
    const callBackID = Symbol();
    if (callBacks[atom]) {
      callBacks[atom][callBackID] = cb;
    } else {
      console.error(`The atom ${atom} does not exist in the store`);
    }
    return () => {
      delete callBacks[atom][callBackID];
    };
  };
  const publish = atom => setter => {
    const newValue = setter(value[atom]);
    if (value[atom] !== newValue) {
      value[atom] = newValue;
      Object.getOwnPropertySymbols(callBacks[atom]).forEach(cbID => {
        const cb = callBacks[atom][cbID];
        cb(newValue);
      });
    }
  };
  return {
    getCurrent,
    subscribe,
    publish
  };
};

export const useYeet = (atom, [getter, setter]) => {
  const store = useContext(YeetContext);
  const [state, setState] = useState(store.getCurrent(atom));
  const yeetState = getter(state);
  const yeetSetState = val => {
    store.publish(atom)(setter);
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(atom)(setState);
    return () => unsubscribe();
  }, []);
  return [yeetState, yeetSetState];
};

export const useSetter = (atom, setter) => {
  const store = useContext(YeetContext);
  const yeetSetState = {};
  return yeetSetState;
};

export const useGetter = (atom, getter) => {
  const store = useContext(YeetContext);
  const [state, setState] = useState(store.getCurrent(atom));
  const yeetState = getter(state);

  useEffect(() => {
    const unsubscribe = store.subscribe(atom)(setState);
    return () => unsubscribe();
  }, []);
  return yeetState;
};

export const YeetContext = React.createContext(null);
