import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../store/user/selectors";
import { logOut } from "../store/user/slice";

const Logout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logOut());
    navigate("/", { replace: true });
  }, []);

  {
    user ? <div>loading...</div> : <div></div>;
  }
  return <div>Logging out...</div>;
};

export { Logout };
