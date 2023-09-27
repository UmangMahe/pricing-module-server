import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  AUTH_TOKEN,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_FACEBOOK,
  USER_INFO,
  AUTH_TOKEN_CHAT,
  USER_INFO_CHAT,
} from "../constants/Auth";
import {
  showAuthMessage,
  authenticated,
  signOutSuccess,
  signUpSuccess,
  signInWithGoogleAuthenticated,
  signInWithFacebookAuthenticated,
  authenticatedChat,
  authFailed,
} from "../actions/Auth";
import JwtAuthService from "../../services/JwtAuthService";
import FirebaseService from "../../services/FirebaseService";
import { MSG_VARIABLE } from "../../constants/ErrorConstants";

export function* signInWithFBEmail() {
  yield takeEvery(SIGNIN, function* ({ payload }) {
    const { email, password } = payload;
    try {
      const user = yield call(JwtAuthService.login, email, password);

      if (user.access_token && user.user) {
        localStorage.setItem(AUTH_TOKEN, user.access_token);
        localStorage.setItem(USER_INFO, JSON.stringify(user.user));
        yield put(authenticated(user.access_token, user.user));
      }
    } catch (err) {
      yield put(authFailed());
      if (err.response) {
        yield put(showAuthMessage(err.response?.data[MSG_VARIABLE]));
      }
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      const user = yield call(JwtAuthService.logout);
      if (user) {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(USER_INFO);
        yield put(signOutSuccess("Logout Successful"));
      }
    } catch (err) {
      yield put(authFailed());
      if (err.response) {
        yield put(showAuthMessage(err.response?.data[MSG_VARIABLE]));
      }
    }
  });
}

export function* signUpWithEmail() {
  yield takeEvery(SIGNUP, function* ({ payload }) {
    try {
      const user = yield call(
        JwtAuthService.signUp,
        payload
      );
      
      if (user) {
        // localStorage.setItem(AUTH_TOKEN, user.user.uid);
        yield put(signUpSuccess(user.token));
      }
    } catch (err) {
      yield put(authFailed());
      if (err.response) {
        yield put(showAuthMessage(err.response?.data[MSG_VARIABLE]));
      }
    }
  });
}

export function* signInWithFBGoogle() {
  yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
    try {
      const user = yield call(FirebaseService.signInGoogleRequest);
      if (user[MSG_VARIABLE]) {
        yield put(showAuthMessage(user[MSG_VARIABLE]));
      } else {
        localStorage.setItem(AUTH_TOKEN, user.user.uid);
        yield put(signInWithGoogleAuthenticated(user.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
    try {
      const user = yield call(FirebaseService.signInFacebookRequest);
      if (user[MSG_VARIABLE]) {
        yield put(showAuthMessage(user[MSG_VARIABLE]));
      } else {
        localStorage.setItem(AUTH_TOKEN, user.user.uid);
        yield put(signInWithFacebookAuthenticated(user.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(signInWithFBEmail),
    fork(signOut),
    fork(signUpWithEmail),
    fork(signInWithFBGoogle),
    fork(signInWithFacebook),
  ]);
}
