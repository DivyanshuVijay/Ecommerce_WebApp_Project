import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate(); //we have created its variable bcoz useNavigate is a hook

  //form submitting function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password`,
        {
          email,
          answer,
          newPassword,
        }
      ); //ye next bracket wali chije hume pass krani hai
      if (res && res.data.success) {
        toast.success("Password reset seccessfully!!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container">
        <h1>Forgot Password?? - Don't worry!!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email} //means here we are binding the value in name with its state
              onChange={(e) => setEmail(e.target.value)} // e means event
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter your Favorite Color"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your New Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
