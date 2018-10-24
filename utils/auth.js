import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import { logout } from './lock';

const getQueryParams = () => {
	const params = {};
	window.location.href.replace(
		/([^(?|#)=&]+)(=([^&]*))?/g,
		($0, $1, $2, $3) => {
			params[$1] = $3;
		}
	);
	return params;
};

export const extractInfoFromHash = () => {
	if (process.server) return;
	const { id_token, state } = getQueryParams();
	return {
		token: id_token,
		secret: state
	};
};

export const setToken = token => {
	if (process.server) return;
	window.localStorage.setItem('token', token);
	window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)));
  Cookie.set('jwt', token);
};

export const unsetToken = () => {
	if (process.server) return;
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('user');
	window.localStorage.removeItem('secret');
	Cookie.remove('jwt');
	window.localStorage.setItem('logout', Date.now());
};

export const getUserFromCookie = req => {
	if (!req.headers.cookie) return;
	const jwtCookie = req.headers.cookie
		.split(';')
		.find(c => c.trim().startsWith('jwt='));
	if (!jwtCookie) return;
	const jwt = jwtCookie.split('=')[1];
	const user =
		jwtDecode(jwt) && jwtDecode(jwt).exp * 1000 >= new Date().getTime()
			? jwtDecode(jwt)
      : undefined;
      if(!user){

      }
	return user;
};

export const getUserFromLocalStorage = () => {
	const json = window.localStorage.user;
	const user =
		json && JSON.parse(json).exp * 1000 >= new Date().getTime()
			? JSON.parse(json)
			: undefined;
	if (!user) {
		unsetToken();
		logout();
	}
	return user;
};

export const setSecret = secret =>
	window.localStorage.setItem('secret', secret);

export const checkSecret = secret => window.localStorage.secret === secret;
