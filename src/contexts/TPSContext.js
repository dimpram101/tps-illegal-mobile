import { createContext, useContext, useState } from "react";

const TPSContext = createContext();

export const useTPS = () => useContext(TPSContext);

export const TPSProvider = ({ children }) => {
  const [hasSentData, setHasSentData] = useState(false);

  const value = {
    hasSentData,
    setHasSentData,
  };

  return <TPSContext.Provider value={value}>{children}</TPSContext.Provider>;
};
