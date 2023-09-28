import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  AUTH_FAILED,
  SIGNOUT_RESET
} from '../constants/Auth';

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  }
};

export const authenticated = (token, user) => {
  return {
    type: AUTHENTICATED,
    token, 
    user
  }
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

export const signOutSuccess = (message) => {
  return {
    type: SIGNOUT_SUCCESS,
    message: message
  }
};

export const signOutReset = () => {
  return {
    type: SIGNOUT_RESET
  }
};

export const signUp = (user) => {
  return {
    type: SIGNUP,
    payload: user
  };
};

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const authFailed = ()=>{
  return{
    type: AUTH_FAILED
  }

};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};
