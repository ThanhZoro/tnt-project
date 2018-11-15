import _ from 'lodash'
import moment from 'moment';

const getUsers = (state, getter, rootState) => {
  var userData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.listUsers, (v) => {
    return (!v.isDelete &&
            (v.fullName.toLowerCase().indexOf(state.searchUser.description.toLowerCase()) > -1 ||
            v.email.toLowerCase().indexOf(state.searchUser.description.toLowerCase()) > -1 ||
            v.phoneNumber.toLowerCase().indexOf(state.searchUser.description.toLowerCase()) > -1));
  });
  data = _.orderBy(data, [function (o) { return o[state.searchUser.sort.field] || ''; }], [state.searchUser.sort.sortOrder]);
  userData.total = data.length;
  data = _.take(_.drop(data, (state.searchUser.currentPage - 1) * state.searchUser.pageSize), state.searchUser.pageSize);
  userData.data= data;
  return userData;
};

export default {
  getUsers
};
