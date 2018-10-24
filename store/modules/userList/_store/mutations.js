import Vue from 'vue';

const SET_USERS = (state, messages) => {
  state.users = [];
  state.users = messages.data;
  state.total = messages.total;
};

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

export default {
  SHOW_HIDE_COLS,
  SET_USERS
};
