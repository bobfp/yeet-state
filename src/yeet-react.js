import React, { useContext } from "react";

export const YeetContext = React.createContext(null);

export const useSetter = atom => setter => {
  const store = useContext(YeetContext);
  return param1 => store.publish(atom)(setter(param1));
  // return param1 => param2 => store.publish(atom)(setter(param1)(param2));
};
