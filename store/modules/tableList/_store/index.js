import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  tables: null,
  area: null,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  },
  headers: {
    code: true,
    name: true,
    seats: true,
    area: true,
    status: true,
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
