import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  listNotify: null,
  total: 0,
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "createdAt", sortOrder: "desc" }
  },
  headers: {
    titleSend: true,
    startDate: true,
    endDate: true,
    status: true,
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
