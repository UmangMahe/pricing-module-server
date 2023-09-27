import {
	AUTH_TOKEN,
	USER_INFO,
	AUTHENTICATED,
	SHOW_AUTH_MESSAGE,
	HIDE_AUTH_MESSAGE,
	SIGNOUT_SUCCESS,
	SIGNUP_SUCCESS,
	SHOW_LOADING,
	SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  SIGNIN,
  AUTHENTICATED_CHAT,
  AUTH_TOKEN_CHAT,
  USER_INFO_CHAT,
  AUTH_FAILED,
  SIGNOUT_RESET
} from '../constants/Auth';

const initState = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  token: localStorage.getItem(AUTH_TOKEN),
  token_chat: localStorage.getItem(AUTH_TOKEN_CHAT),
  logout: false,
  currentUser: JSON.parse(localStorage.getItem(USER_INFO)),
  chat_user: JSON.parse(localStorage.getItem(USER_INFO_CHAT))
}

const auth = (state = initState, action) => {
	switch (action.type) {
		case AUTHENTICATED_CHAT: 
		return {
			...state,
			loading: false,
			redirect: '/',
			token_chat: action.token,
			chat_user: action.user

		}
		case AUTHENTICATED:
			return {
				...state,
				loading: false,
				redirect: '/',
				token: action.token,
				currentUser: action.user

			}
		case AUTH_FAILED: 
			return{
				...state,
				loading: false,
				token: null,
				currentUser: null,
				token_chat: null,
				chat_user: null,
			}
		case SHOW_AUTH_MESSAGE: 
			return {
				...state,
				message: action.message,
				showMessage: true,
				loading: false
			}
		case HIDE_AUTH_MESSAGE: 
			return {
				...state,
				message: '',
				showMessage: false,
			}
		case SIGNOUT_SUCCESS: {
			return {
				...state,
				token: null,
				token_chat: null,
				redirect: '/',
				loading: false,
				showMessage: false,
				message: action.message,
				logout: true,
			}
		}
		case SIGNOUT_RESET: {
			return {
			  ...state,
			  logout: false,
			}
		  }
		case SIGNUP_SUCCESS: {
			return {
			  ...state,
			  loading: false,
			  token: action.token
			}
		}
		case SHOW_LOADING: {
			return {
				...state,
				loading: true
			}
		}
		case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SIGNIN: {
			return{
				...state,
				logout: false,
			}
		}
		default:
			return state;
	}
}

export default auth