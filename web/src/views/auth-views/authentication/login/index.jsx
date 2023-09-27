import { notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginOne from "../login-1";
import { signOutReset } from "../../../../redux/actions/Auth";

const Login = (props) => {
  const { message, token, logout } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (logout && token === null) {
      notification.success({
        message: message,
      });
      dispatch(signOutReset());
    }
  }, [logout, token, message, dispatch]);

  return <LoginOne showForgetPassword allowRedirect {...props} />;
};

export default Login;
