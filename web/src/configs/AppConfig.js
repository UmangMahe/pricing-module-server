
import { DIR_LTR, NAV_TYPE_SIDE, SIDE_NAV_LIGHT } from '../constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Pricing Module';
export const APP_BASE_URL = import.meta.env.VITE_BASE_PATH
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/dashboard';
export const AUTH_PREFIX_PATH = '/auth';

export const THEME_CONFIG = {
	
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR
};
