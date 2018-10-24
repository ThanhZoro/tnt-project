import _ from 'lodash';
const SET_CATEGORY = (state, messages) => {
  state.category = messages.data;
};
const SET_AREA = (state, messages) => {
  state.area = messages.data;
};
export default {
  SET_CATEGORY,
  SET_AREA
};
