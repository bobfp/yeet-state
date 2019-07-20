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
  if (setter.length === 2) {
    return param1 => store.publish(atom)(state => setter(param1, state));
  }
  if (setter.length === 3) {
    return param1 => param2 =>
      store.publish(atom)(state => setter(param1, param2, state));
  }
  if (setter.length === 4) {
    return param1 => param2 => param3 =>
      store.publish(atom)(state => setter(param1, param2, param3, state));
  }
  if (setter.length === 5) {
    return param1 => param2 => param3 => param4 =>
      store.publish(atom)(state =>
        setter(param1, param2, param3, param4, state)
      );
  }
  if (setter.length === 6) {
    return param1 => param2 => param3 => param4 => param5 =>
      store.publish(atom)(state =>
        setter(param1, param2, param3, param4, param5, state)
      );
  }
  if (setter.length === 7) {
    return param1 => param2 => param3 => param4 => param5 => param6 =>
      store.publish(atom)(state =>
        setter(param1, param2, param3, param4, param5, param6, state)
      );
  }
};

export const useYeet = atom => lens => {
  const [getter, setter] = lens;
  const state = useGetter(atom)(getter);
  const setState = useSetter(atom)(setter);
  return [state, setState];
};
