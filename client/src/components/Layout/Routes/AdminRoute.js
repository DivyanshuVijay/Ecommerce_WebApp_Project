import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom"; //outlet used for nested routing ... it enables routing's functionalities
import axios from "axios";
import Spinner from "../../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/v1/auth/admin-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck(); //agar auth me token milega toh hi authCheck function ko call krna hai
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
