import _ from 'lodash'
import moment from 'moment';
const getUsers = (state, getter, rootState) => {
  var userData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.users, (v) => {
    v.fromNowCreate = v.createdAt ? moment(v.createdAt).fromNow() : '';
    v.fromNowUpdate = v.updatedAt ? moment(v.updatedAt).fromNow() : '';
    v.locale = rootState.locale;
    return (!v.isDelete &&
            (v.fullName.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.email.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.phoneNumber.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1));
  });
  data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder]);
  userData.total = data.length;
  data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
  userData.data= data;
  return userData;
};
export default {
  getUsers
};
