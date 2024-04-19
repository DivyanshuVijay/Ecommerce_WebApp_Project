import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //now it becomes global we can access it anywhere
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios paramter
  axios.defaults.headers.common["Authorization"] = auth?.token; // this means auth?.token ... agar auth hai toh usme se token nikalke authorization me daaldo

  useEffect(() => {
    const data = localStorage.getItem("auth"); //now with this refresh krne pr bhi data gayab ni hoga , ##################check pictures
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook-> we can use this anywhere
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
