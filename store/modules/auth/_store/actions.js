import  firebase,{auth, GoogleProvider,FacebookProvider} from '@/services/fireinit.js';
import api from '../_api';
import utils from '~/utils/common-func/advanceFilter'

const login =async (context, user) =>{
  const token = await firebase.auth().currentUser.getIdToken(true);
  const {status} = await api.login({ user: user, token: token });
  context.commit('SET_USER',user);
};
const logout = async (context) =>{
  await firebase.auth().signOut();
  await api.logout();
  context.commit('SET_USER');
};
const setUser = (context, payload) =>{
  context.commit('SET_USER', payload)
};
const signInWithGoogle= async (context)=> {
  return await auth.signInWithRedirect(GoogleProvider);
};
const signInWithFacebook= async (context)=> {
  return await auth.signInWithRedirect(FacebookProvider);
};

export default {
  login,
  logout,
  setUser,
  signInWithGoogle,
  signInWithFacebook
};
