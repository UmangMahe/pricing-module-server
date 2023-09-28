import {
  AUTH_TOKEN,
  USER_INFO,
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN,
  AUTH_FAILED,
  SIGNOUT_RESET,
} from "../constants/Auth";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  token: localStorage.getItem(AUTH_TOKEN),
  logout: false,
  currentUser: JSON.parse(localStorage.getItem(USER_INFO)),
};

const auth = (state = initState, action) => {
  switch (action.type) {
    
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/",
        token: action.token,
        currentUser: action.user,
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        token: null,
        currentUser: null,
        token_chat: null,
      };
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false,
      };
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: "",
        showMessage: false,
      };
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        token_chat: null,
        redirect: "/",
        loading: false,
        showMessage: false,
        message: action.message,
        logout: true,
      };
    }
    case SIGNOUT_RESET: {
      return {
        ...state,
        logout: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGNIN: {
      return {
        ...state,
        logout: false,
      };
    }
    default:
      return state;
  }
};

export default auth;
