import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  listUsers: [],
  history: [],
  total: 0,
  searchRequestPV: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  },
  searchRequestPC: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
