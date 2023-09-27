import { lazy } from "react";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "../configs/AppConfig";
import AuthLayout from "../layouts/auth-layout";

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
        component: lazy(() => import("../views/app-views/dashboards/sales")),
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
        path: `${APP_PREFIX_PATH}/products`,
        exact: true,
        meta: {
          auth: true,
          title: "Products",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/Products/ProductList")
        ),
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
      {
        path: `${APP_PREFIX_PATH}/products/:id`,
        exact: true,
        meta: {
          auth: true,
          title: "Product Details",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/Products/ProductEdit")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/categories`,
        exact: true,
        meta: {
          auth: true,
          title: "Categories",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/Categories/CategoryList")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/categories/add-category`,
        exact: true,
        meta: {
          auth: true,
          title: "Add Category",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/Categories/CategoryAdd")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/categories/:id`,
        exact: true,
        meta: {
          auth: true,
          title: "Category Details",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/Categories/CategoryEdit")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/sub-categories`,
        exact: true,
        meta: {
          auth: true,
          title: "Sub Categories",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/SubCategories/SubCategoryList")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/sub-categories/add-sub-category`,
        exact: true,
        meta: {
          auth: true,
          title: "Add Sub Category",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/SubCategories/SubCategoryAdd")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/sub-categories/:id`,
        exact: true,
        meta: {
          auth: true,
          title: "Sub Category Details",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/SubCategories/SubCategoryEdit")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/orders`,
        exact: true,
        meta: {
          auth: true,
          title: "Orders",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/Orders/OrderList")),
      },
      {
        path: `${APP_PREFIX_PATH}/orders/:id`,
        exact: true,
        meta: {
          auth: true,
          title: "Sub Orders",
          breadcrumb: true,
        },
        component: lazy(() =>
          import(
            "../views/app-views/Orders/OrderList/OrderList/SingleOrderList"
          )
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/states`,
        exact: true,
        meta: {
          auth: true,
          title: "States",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/States/StateList")),
      },
      {
        path: `${APP_PREFIX_PATH}/states/add-state`,
        exact: true,
        meta: {
          auth: true,
          title: "Add State",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/States/StateAdd")),
      },
      {
        path: `${APP_PREFIX_PATH}/states/:id`,
        exact: true,
        meta: {
          auth: true,
          title: "State Details",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/States/StateEdit")),
      },
      {
        path: `${APP_PREFIX_PATH}/states/:id/cities`,
        exact: true,
        meta: {
          auth: true,
          title: "Cities",
          breadcrumb: false,
        },
        component: lazy(() =>
          import("../views/app-views/States/StateList/StateList/CityList")
        ),
      },

      {
        path: `${APP_PREFIX_PATH}/states/:id/cities/add-city`,
        exact: true,
        meta: {
          auth: true,
          title: "Add City",
          breadcrumb: true,
        },
        component: lazy(() =>
          import("../views/app-views/States/StateList/StateList/CityAdd")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/states/:id/cities/:cityId`,
        exact: true,
        meta: {
          auth: true,
          title: "Edit City",
          breadcrumb: false,
        },
        component: lazy(() =>
          import("../views/app-views/States/StateList/StateList/CityEdit")
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/states/:id/cities/:cityId/pincodes`,
        exact: true,
        meta: {
          auth: true,
          title: "Pincodes",
          breadcrumb: false,
        },
        component: lazy(() =>
          import(
            "../views/app-views/States/StateList/StateList/CityList/PincodeList"
          )
        ),
      },
      
      {
        path: `${APP_PREFIX_PATH}/states/:id/cities/:cityId/pincodes/add-pincode`,
        exact: true,
        meta: {
          auth: true,
          title: "Add Pincode",
          breadcrumb: true,
        },
        component: lazy(() =>
          import(
            "../views/app-views/States/StateList/StateList/CityList/PincodeAdd"
          )
        ),
      },
      {
        path: `${APP_PREFIX_PATH}/states/:id/cities/:cityId/pincodes/:pincodeId`,
        exact: true,
        meta: {
          auth: true,
          title: "Edit Pincode",
          breadcrumb: false,
        },
        component: lazy(() =>
          import(
            "../views/app-views/States/StateList/StateList/CityList/PincodeEdit"
          )
        ),
      },

      {
        path: `${APP_PREFIX_PATH}/chat`,
        exact: false,
        meta: {
          auth: true,
          title: "Chat",
          breadcrumb: true,
        },
        component: lazy(() => import("../views/app-views/Chat")),
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
