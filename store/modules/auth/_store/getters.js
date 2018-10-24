const isAuthenticated = (state) =>{
  return !!state.user
}

export default {
  isAuthenticated
};
