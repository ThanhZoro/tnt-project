import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  table: [],
  currentSO: {},
  currentSO4Dish: {},
  listDish: {},
  category: [],
  searchRequest: {
    description: '',
    currentPage: 1,
    pageSize: 100,
    sort: { field: "weight", sortOrder: "asc" },
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
