import { API_BASE_URL, CHAT_API_URL } from "../configs/AppConfig"
import { env } from '../configs/EnvironmentConfig'


export const LOGIN = API_BASE_URL+'/auth/login'
export const REGISTER = API_BASE_URL+'/auth/register'
export const LOGOUT = API_BASE_URL+'/auth/logout'
export const PRODUCT_LIST = API_BASE_URL+'/vendor/products'
export const CATEGORY_LIST = API_BASE_URL+'/vendor/categories'
export const SUB_CATEGORY_LIST = API_BASE_URL+'/vendor/sub_categories'
export const ORDER_LIST = API_BASE_URL+'/vendor/orders'
export const PRODUCT_IMAGES = API_BASE_URL+'/vendor/product-images'
export const STATE_LIST = API_BASE_URL+'/vendor/states'
export const CITY_LIST = API_BASE_URL+'/vendor/cities'
export const PINCODE_LIST = API_BASE_URL+'/vendor/pincodes'

//Chat Api

export const LOGIN_CHAT = CHAT_API_URL+'/auth/login'
export const USER_CONVERSATIONS = CHAT_API_URL+'/conversation'
export const USERS = CHAT_API_URL+'/users'
export const MESSAGES = CHAT_API_URL+'/message'

export const STREAM_API = env.STREAM_API_SECRET;
