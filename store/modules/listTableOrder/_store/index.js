import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  tables: null,
  soNews: null,
  area: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 100,
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
