import fetch from '../auth/FetchInterceptor'
import { LOGIN } from '@constants/ApiConstants'
import {LOGOUT, REGISTER } from '../constants/ApiConstants'

const JwtAuthService = {}

JwtAuthService.login = function (email, password) {
	const form = new FormData()
	form.append('email', email)
	form.append('password', password)
	return fetch({
		url: LOGIN,
		method: 'post',
		data: form,
		errorNotification: false
	})
}

JwtAuthService.logout = function () {
	return fetch({
		url: LOGOUT,
		method: 'delete',
		errorNotification: false
	})
}

JwtAuthService.signUp = function (data) {
	return fetch({
		url: REGISTER,
		method: 'post',
		data: data
	})
}

export default JwtAuthService