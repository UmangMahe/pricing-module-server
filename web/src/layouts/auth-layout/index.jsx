import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Loading from "@components/shared-components/Loading";
import { useThemeSwitcher } from "react-css-theme-switcher";

import { Suspense } from "react";
import { useSelector } from "react-redux";
import { AUTH_PREFIX_PATH } from "../../configs/AppConfig";

export const AuthLayout = ({ routes = [], ...props }) => {
  const { status } = useThemeSwitcher();

  if (status === "loading") {
    return <Loading cover="page" />;
  }

  return (
    <Suspense fallback={<Loading cover="page" />}>
      <div className="auth-container">
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
          <Redirect
            from={`${AUTH_PREFIX_PATH}`}
            to={`${AUTH_PREFIX_PATH}/login`}
          />
          <Redirect to="/404" />
        </Switch>
      </div>
    </Suspense>
  );
};

export default AuthLayout;
