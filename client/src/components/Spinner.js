import React from "react";
import {  useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";

const Spinner = ({path =  "login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate()

//   count value will decrease by one after every one second and onces its get zero we will navigate to login page 
  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((prevalue) => --prevalue);
    }, 1000);
    if(count === 0 ){

        navigate(`/${path}`)
    }

    return () => clearInterval(Interval)

  }, [count,navigate,path]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h4>Redirecting to Login Page in {count}</h4>  
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

export default Spinner;
