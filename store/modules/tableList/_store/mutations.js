
const SET_TABLE = (state, messages) => {
  state.tables = [];
  state.tables = messages.data;
};

const SET_AREA = (state, messages) => {
  state.area = messages;
};

const SHOW_HIDE_COLS = (state, messages) => {
  state.headers[messages.props] = !state.headers[messages.props];
};

export default {
  SHOW_HIDE_COLS,
  SET_TABLE,
  SET_AREA
};
