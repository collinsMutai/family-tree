import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const FamilyContext = createContext({});

const FamilyContextProvider = ({ children }) => {
  const [grandparent, setGrandparent] = useState([]);

  return (
    <FamilyContext.Provider value={{ grandparent, setGrandparent }}>
      {children}
    </FamilyContext.Provider>
  );
};

export default FamilyContextProvider;
