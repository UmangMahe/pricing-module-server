import axios from 'axios'
import { API_BASE_URL, AUTH_PREFIX_PATH } from '../configs/AppConfig'
import { AUTH_TOKEN } from '@redux/constants/Auth'
import { notification } from 'antd';
import { USER_INFO } from '../redux/constants/Auth';

const service = axios.create({
	baseURL: API_BASE_URL,
	timeout: 60000,
	errorNotification: true
})

// Config

const TOKEN_PAYLOAD_KEY = 'authorization'
const AUTH_TYPE = 'Bearer'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN)

	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = AUTH_TYPE + " " + jwtToken
	}

	return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
	Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use((response) => {
	return response.data
}, (error) => {

	const { errorNotification } = error.response.config
	if (errorNotification) {
		// Do something with response error here
		let notificationParam = {
			message: ''
		}
		// Remove token and redirect 
		if (error.response?.status === 401) {
			notificationParam.message = 'Authentication Fail'
			notificationParam.description = 'Please login again'
			localStorage.removeItem(AUTH_TOKEN)
			localStorage.removeItem(USER_INFO)
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

		else {
			if(error.response.data.message)
				notificationParam.message = error.response.data.message
			else
				notificationParam.message = error.message
		}

		notification.error(notificationParam)
	}

	return Promise.reject(error);
});

export default service