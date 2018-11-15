import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  dishes: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 12,
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
