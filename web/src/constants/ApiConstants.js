import { API_BASE_URL } from "../configs/AppConfig"

export const LOGIN = API_BASE_URL + '/auth/login'
export const REGISTER = API_BASE_URL + '/auth/register'
export const LOGOUT = API_BASE_URL + '/auth/logout'


export const GET_CONFIGS = API_BASE_URL + '/pricing'
export const PARTICULAR_CONFIG = GET_CONFIGS + '/configuration'
export const UPDATE_CONFIG = PARTICULAR_CONFIG + '/update'
export const TOGGLE_CONFIG = API_BASE_URL + '/pricing/configuration/toggle'
export const GET_LOGS = API_BASE_URL+'/logs'