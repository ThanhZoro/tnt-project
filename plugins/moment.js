import Vue from 'vue';
import moment from 'moment';
Vue.use(require('vue-moment'),moment);
export default ({ req }) => {
	if (process.server) {
		const langCookie = req.headers.cookie ? req.headers.cookie
			.split(';')
			.find(c => c.trim().startsWith('language=')) : null;
		if (langCookie) {
			moment.locale(langCookie.split('=')[1]);
    }
	} else {
		moment.locale(window.localStorage.getItem('language'));
  }
};
