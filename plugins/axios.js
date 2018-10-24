import axios from 'axios';
export default ({ store,req, app }) => {
  axios.defaults.baseURL = process.env.baseUrl;
  if (process.server) {
    const token = req.headers.cookie ? req.headers.cookie
      .split(';')
      .find(c => c.trim().startsWith('access_token=')) : null;
    if (token) {
      axios.defaults.headers.common['Authorization'] = token.split('=')[1];
    }
  } else {
    var token = store.state.auth.user ? store.state.auth.user.qa: '';
    axios.defaults.headers.common['Authorization'] = token;
    // interceptors request
    axios.interceptors.request.use(config => {
      if(app.router.app.$loading){app.router.app.$loading.start()};
      return config;
    }, err => {
      return Promise.reject(err);
    });

    axios.interceptors.response.use(response => {
      if(app.router.app.$loading){app.router.app.$loading.finish()};
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
  }
};
