import jwtDecode from 'jwt-decode'
import axios from 'axios';
export default function ({store, req}) {
  if(axios.defaults.headers.common['Authorization'] == ""){
    var token = store.state.auth.user ? store.state.auth.user.qa: '';
    axios.defaults.headers.common['Authorization'] = token;
  }
  if (process.server && store.state.auth.user) {
    let uid = getUserFromSession(req)
    if (!uid) {
      uid = getUserFromCookie(req)
    }
    /*if (uid) {
      store.dispatch('modules/user/saveUID', uid)
    }*/
  }
}

function getUserFromSession (req) {
  return req.session ? req.session.user : null
}

function getUserFromCookie (req) {

  if (!req.headers.cookie) return

  const accessTokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('access_token='))
  if (!accessTokenCookie) return

  // https://firebase.google.com/docs/auth/admin/verify-id-tokens
  const accessToken = accessTokenCookie.split('=')[1]
  const decodedToken = jwtDecode(accessToken)
  if (!decodedToken) return

  if (new Date() > new Date(decodedToken.exp)) {
    return
  }

  return decodedToken.sub
}
