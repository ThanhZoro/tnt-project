
const SET_TABLE = (state, messages) => {
  state.tables = [];
  state.tables = messages.data;
};
const SET_SO_NEW = (state, messages) => {
  state.soNews = [];
  state.soNews = messages.data;
};

const SET_LIST_NOTIFY = (state, messages) => {
  state.listNotify = [];
  state.listNotify = messages.data;
};

const SET_AREA = (state, messages) => {
  state.area = messages;
};

export default {
  SET_SO_NEW,
  SET_LIST_NOTIFY,
  SET_TABLE,
  SET_AREA
};
