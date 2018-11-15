import _ from 'lodash'
import moment from 'moment';
const getDishes = (state, getter, rootState) => {
  var dishData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.dishes, (v) => {
    v.fromNowCreate = v.createdAt ? moment(v.createdAt).fromNow() : '';
    v.fromNowUpdate = v.updatedAt ? moment(v.updatedAt).fromNow() : '';
    v.locale = rootState.locale;
    return (!v.isDelete &&
            (v.code.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.name.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.categoryId.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1));
  });
  data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder]);
  dishData.total = data.length;
  data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
  dishData.data= data;
  return dishData;
};
export default {
  getDishes
};
