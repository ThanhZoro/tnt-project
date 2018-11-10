
const SET_LIST_SO = (state, messages) => {
  state.listNewOrder = [];
  state.listNewOrder = messages.data;
};


export default {
  SET_LIST_SO
};
