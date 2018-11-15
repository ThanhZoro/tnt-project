import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  listUsers: [],
  searchUser: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "fullName", sortOrder: "asc" }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
