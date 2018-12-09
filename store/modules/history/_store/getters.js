import _ from 'lodash'
import moment from 'moment';
const getHistory = (state, getter, rootState) => {
  var historyData = { historyPV: [], historyPC: [], totalPV: 0, totalPC: 0 };
  var dataPV = [];
  var dataPC = [];
  dataPV = _.filter(state.history, (v) => {
    v.fromNowCreate = v.createdAt ? moment(v.createdAt).fromNow() : '';
    let user = _.find(state.listUsers, o => { return o.id == v.createdBy });
    v.nameUser = user ? user.fullName : '';
    v.emailUser = user ? user.email : '';
    v.locale = rootState.locale;
    return v.type == 'nvpv';
  });
  dataPC = _.filter(state.history, (v) => {
    v.fromNowCreate = v.createdAt ? moment(v.createdAt).fromNow() : '';
    let user = _.find(state.listUsers, o => { return o.id == v.createdBy });
    v.nameUser = user ? user.fullName : '';
    v.emailUser = user ? user.email : '';
    v.locale = rootState.locale;
    return v.type == 'nvpc';
  });
  dataPV = _.orderBy(dataPV, [function (o) { return o[state.searchRequestPV.sort.field] || ''; }], [state.searchRequestPV.sort.sortOrder]);
  dataPC = _.orderBy(dataPC, [function (o) { return o[state.searchRequestPC.sort.field] || ''; }], [state.searchRequestPC.sort.sortOrder]);
  historyData.totalPV = dataPV.length;
  historyData.totalPC = dataPC.length;
  dataPV = _.take(_.drop(dataPV, (state.searchRequestPV.currentPage - 1) * state.searchRequestPV.pageSize), state.searchRequestPV.pageSize);
  dataPC = _.take(_.drop(dataPC, (state.searchRequestPC.currentPage - 1) * state.searchRequestPC.pageSize), state.searchRequestPC.pageSize);
  historyData.historyPV= dataPV;
  historyData.historyPC= dataPC;
  return historyData;
};
export default {
  getHistory
};
