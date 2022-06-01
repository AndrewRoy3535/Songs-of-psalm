import React, {createContext} from 'react';

export const Contextprovider = createContext();

export function Context({children}) {
  return (
    <Contextprovider.Provider value={{name: 'React Native'}}>
      {children}
    </Contextprovider.Provider>
  );
}

export default Context;
