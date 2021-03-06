import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  users: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  },
  headers: {
    fullName: true,
    email: true,
    phone: true,
    roleUser: true,
    createdAt: false,
    updatedAt: false,
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
