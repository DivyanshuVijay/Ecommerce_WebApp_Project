import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //useLocation hook is used when example:  user is trying to access cart , but first he login and after login we redirected him to home , but he want to access cart , so its better to directly redirect him to cart.. to enhance user experience

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3); //3 sec initial time
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    //jese hi count=0 ho jaaye is page ko redirect kr dena hai login page pe
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h2 className="text-center">
          Redirecting to Login in {count} seconds...
        </h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
