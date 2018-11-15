
const SET_LIST_USER = (state, messages) => {
  state.listUsers = [];
  state.listUsers = messages.data;
};

export default {
  SET_LIST_USER
};
