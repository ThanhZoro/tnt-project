import Vue from 'vue';

const SET_HISTORY = (state, messages) => {
  state.history = [];
  state.history = messages.data;
  state.total = messages.total;
};

const SET_LIST_USER = (state, messages) => {
  state.listUsers = [];
  state.listUsers = messages.data;
};

export default {
  SET_LIST_USER,
  SET_HISTORY
};
