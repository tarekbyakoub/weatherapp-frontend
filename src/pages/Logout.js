import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/user/slice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logOut()).then(() => {
      navigate("/", { replace: true });
    });
  }, []);

  return <div>Logging out...</div>;
};

export { Logout };
