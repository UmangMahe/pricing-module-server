import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import AppLocale from "../lang";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "../configs/AppConfig";
import useBodyClass from "../hooks/useBodyClass";
import { routes } from "../routes";

function RouteInterceptor({ children, isAuthenticated, ...rest }) {
  return (
    <Route {...rest}>
      {rest.path === AUTH_PREFIX_PATH ? (
        children
      ) : isAuthenticated ? (
        children
      ) : (
        <Redirect to={AUTH_PREFIX_PATH} />
      )}
    </Route>
  );
}

export const Views = (props) => {
  const { locale, token, location, direction } = props;
  const currentAppLocale = AppLocale[locale];

  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path="/">
              <Redirect to={APP_PREFIX_PATH} />
            </Route>
            {routes.map((route, index) => {
              const { component, ...rest } = route;
              return (
                <RouteInterceptor
                  key={index}
                  {...rest}
                  isAuthenticated={token}
                >
                  <route.component
                    direction={direction}
                    location={location}
                    routes={rest.routes}
                  />
                </RouteInterceptor>
              );
            })}

            <Redirect to="/404" />
            {/* <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token}>
            <AppLayout direction={direction} location={location}/>
          </RouteInterceptor> */}
          </Switch>
        </Suspense>
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  const { token } = auth;
  return { locale, direction, token };
};

export default withRouter(connect(mapStateToProps)(Views));
