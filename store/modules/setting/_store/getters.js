import _ from 'lodash'

const getCategory = (state, getter, rootState) => {
  var categoryData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.category, (v) => {
    v.locale = rootState.locale;
    return (v.name.toLowerCase().indexOf(state.searchCategory.description.toLowerCase()) > -1 ||
            v.id.toLowerCase().indexOf(state.searchCategory.description.toLowerCase()) > -1);
  });
  data = _.orderBy(data, [function (o) { return o[state.searchCategory.sort.field] || ''; }], [state.searchCategory.sort.sortOrder]);
  categoryData.total = data.length;
  data = _.take(_.drop(data, (state.searchCategory.currentPage - 1) * state.searchCategory.pageSize), state.searchCategory.pageSize);
  categoryData.data= data;
  return categoryData;
};

const getArea = (state, getter, rootState) => {
  var areaData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.area, (v) => {
    v.locale = rootState.locale;
    return (v.name.toLowerCase().indexOf(state.searchArea.description.toLowerCase()) > -1 ||
            v.id.toLowerCase().indexOf(state.searchArea.description.toLowerCase()) > -1);
  });
  data = _.orderBy(data, [function (o) { return o[state.searchArea.sort.field] || ''; }], [state.searchArea.sort.sortOrder]);
  areaData.total = data.length;
  data = _.take(_.drop(data, (state.searchArea.currentPage - 1) * state.searchArea.pageSize), state.searchArea.pageSize);
  areaData.data= data;
  return areaData;
};

export default {
  getCategory,
  getArea
};
