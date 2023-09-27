import axios from 'axios'
import { CHAT_API_URL, AUTH_PREFIX_PATH } from '../configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN } from '@redux/constants/Auth'
import { notification } from 'antd';
import { AUTH_TOKEN_CHAT } from '../redux/constants/Auth';

const serviceChat = axios.create({
  baseURL: CHAT_API_URL,
  timeout: 60000
})

// Config
const ENTRY_ROUTE = AUTH_PREFIX_PATH
const TOKEN_PAYLOAD_KEY = 'authorization'
const AUTH_TYPE = 'Bearer'
const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
serviceChat.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN_CHAT)
	
  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = AUTH_TYPE + " " + jwtToken
  }

//   if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
// 		history.push(ENTRY_ROUTE)
// 		window.location.reload();
//   }

  return config
}, error => {
	// Do something with request error here
	console.log(error.response)
	notification.error({
		message: 'Error'
	})
  Promise.reject(error)
})

// API respone interceptor
serviceChat.interceptors.response.use( (response) => {
	return response.data
}, (error) => {
	// Do something with response error here
	let notificationParam = {
		message: ''
	}
	// Remove token and redirect 
	if (error.response?.status === 400 || error.response?.status === 403 || error.response?.status === 401) {
		notificationParam.message = 'Authentication Fail'
		notificationParam.description = 'Please login again'
		localStorage.removeItem(AUTH_TOKEN_CHAT)
	}

	else if (error.response?.status === 404) {
		notificationParam.message = 'Not Found'
	}

	else if (error.response.status === 500) {
		notificationParam.message = 'Internal Server Error'
	}
	
	else if (error.response?.status === 508) {
		notificationParam.message = 'Time Out'
	}
	
	else{
		notificationParam.message = 'Error'
	}
	
	notification.error(notificationParam)
	
	return Promise.reject(error);
});

export default serviceChat