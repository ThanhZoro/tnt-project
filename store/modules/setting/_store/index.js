import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  category: [],
  area: [],
  searchCategory: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "id", sortOrder: "desc" },
  },
  searchArea: {
    description: '',
    currentPage: 1,
    pageSize: 10,
    sort: { field: "id", sortOrder: "desc" },
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
