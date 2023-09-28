import { lazy } from "react";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "../configs/AppConfig";
import AuthLayout from "../layouts/auth-layout";
import ProductList from "../views/app-views/Products/ProductList";
import EditProduct from "../views/app-views/Products/ProductEdit";

export const routes = [
  {
    path: AUTH_PREFIX_PATH,
    exact: false,
    meta: {
      auth: false,
      title: "Login",
    },
    component: lazy(() => import("../layouts/auth-layout")),
    routes: [
      {
        path: `${AUTH_PREFIX_PATH}/login`,
        exact: true,
        meta: {
          auth: false,
        },
        component: lazy(() =>
          import("../views/auth-views/authentication/login")
        ),
      },
      {
        path: `${AUTH_PREFIX_PATH}/register`,
        exact: true,
        meta: {
          auth: false,
        },
        component: lazy(() =>
          import("../views/auth-views/authentication/register-2")
        ),
      },

      {
        path: `${AUTH_PREFIX_PATH}/forget-password`,
        exact: true,
        meta: {},
        component: lazy(() =>
          import("../views/auth-views/authentication/forgot-password")
        ),
      },

      //   {
      //     path: `${AUTH_PREFIX_PATH}/login-1`,
      //     exact: true,
      //     meta: {},
      //     component: lazy(() =>
      //       import("../views/auth-views/authentication/login-1")
      //     ),
      //   },
    ],
  },
  {
    path: APP_PREFIX_PATH,
    exact: false,
    meta: {
      auth: true,
      title: "APP",
      breadcrumb: true,
    },
    component: lazy(() => import("../layouts/app-layout")),
    routes: [
      {
        path: APP_PREFIX_PATH,
        exact: true,
        meta: {
          auth: true,
          title: "Dashboard",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/dashboards/default")),
      },
      {
        path: `${APP_PREFIX_PATH}/analytic`,
        exact: true,
        meta: {
          auth: true,
          title: "Dashboard",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/dashboards/analytic")),
      },
      {
        path: `${APP_PREFIX_PATH}/configurations`,
        exact: true,
        meta: {
          auth: true,
          title: "Configurations",
          breadcrumb: true,
        },
        component: ProductList
      },
      {
        path: `${APP_PREFIX_PATH}/configurations/:id`,
        exact: true,
        meta: {
          auth: true,
          title: "Pricing Configuration Details",
          breadcrumb: true,
        },
        component: EditProduct
      },
      {
        path: `${APP_PREFIX_PATH}/products/add-product`,
        exact: true,
        meta: {
          auth: true,
          title: "Add Product",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/Products/ProductAdd")),
      },
      
      

      //   {
      //     path: `${AUTH_PREFIX_PATH}/login`,
      //     exact: true,
      //     meta: {},
      //     component: lazy(() =>
      //       import("../views/auth-views/authentication/login")
      //     ),
      //   },
      //   {
      //     path: `${AUTH_PREFIX_PATH}/login-1`,
      //     exact: true,
      //     meta: {},
      //     component: lazy(() =>
      //       import("../views/auth-views/authentication/login-1")
      //     ),
      //   },
    ],
  },
  {
    path: "/404",
    exact: true,
    meta: {
      auth: false,
      title: "Not Found",
    },
    component: lazy(() => import("../views/auth-views/errors/error-page-1")),
  },
];
