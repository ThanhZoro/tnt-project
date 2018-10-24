import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  user: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
