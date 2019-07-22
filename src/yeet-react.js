import React, { useContext, useEffect, useState } from "react";

export const YeetContext = React.createContext(null);

export const useGetter = atom => getter => {
  const store = useContext(YeetContext);
  const initialState = getter(store.getAtom(atom));
  const [state, setState] = useState(initialState);
  useEffect(() => {
    store.subscribe(atom)(state => setState(getter(state)));
  }, []);
  return state;
};

export const useSetter = atom => setter => {
  const store = useContext(YeetContext);
  return (...args) => {
    store.publish(atom)(state => setter(...args, state));
  };
};

export const useYeet = atom => lens => {
  const [getter, setter] = lens;
  const state = useGetter(atom)(getter);
  const setState = useSetter(atom)(setter);
  return [state, setState];
};
