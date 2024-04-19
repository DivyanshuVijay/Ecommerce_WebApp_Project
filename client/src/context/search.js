import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  //now it becomes global we can access it anywhere
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook-> we can use this anywhere
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
