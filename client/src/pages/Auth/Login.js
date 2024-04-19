import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //we have created its variable bcoz useNavigate is a hook
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  //form submitting function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      }); //ye next bracket wali chije hume pass krani hai
      if (res && res.data.success) {
        toast.success(res && res.data.success);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data)); //we will save these details in auth variable in local storage before navigating so that we can access it later...and convert it into string because local storage me json data support ni krta
        navigate(location.state || "/"); //to access page directly without getting redirected to home page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title={"Login Now"}>
      <div className="form-container">
        <h1>Login page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email} //means here we are binding the value in name with its state
              onChange={(e) => setEmail(e.target.value)} // e means event
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              FORGOT PASSWORD
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOG IN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
