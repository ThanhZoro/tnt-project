import _ from 'lodash'
import moment from 'moment';
import commonData from '~/utils/common-data'

const getTable = (state, getter, rootState) => {
  var tableData = { data: [], total: 0 };
  var data = [];
  if (state.tables) {
    data = _.filter(state.tables, (v) => {
      v.fromNowCreate = v.createdAt ? moment(v.createdAt).fromNow() : '';
      v.fromNowUpdate = v.updatedAt ? moment(v.updatedAt).fromNow() : '';
      if (state.area) {
        let areaObj = _.find(state.area, (o) => { return v.areaId == o.id });
        v.areaName = areaObj.name;
      }
      v.locale = rootState.locale;
      return (!v.isDelete &&
              (v.code.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
              v.name.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
              v.areaId.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
              v.status.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1));
    });
    data = _.orderBy(data, 'weight', 'asc');
    tableData.total = data.length;
    data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
    tableData.data= data;
  }
  return tableData;
};

const getListNotify = (state, getter, rootState) => {
  var notifyData = { data: [], total: 0 };
  var data = [];
  if (state.listNotify) {
    data = _.filter(state.listNotify, (v) => {
      v.startDateTime = v.startDate ? moment(v.startDate).format('HH:mm - DD/MM/YYYY') : '';
      v.endDateTime = v.endDate ? moment(v.endDate).format('HH:mm - DD/MM/YYYY') : '';
      if (moment().isSame(v.createdAt, 'day')) {
        notifyData.total++;
      }
      let currentAdd = moment().add(v.notifyBefore, 'days').endOf('day').toISOString();
      let checkStartDate =  moment(currentAdd).isAfter(v.startDate);
      v.locale = rootState.locale;
      if (!v.forAllUser) {
        let exits = _.find(v.sendTo, o => { return o == rootState.auth.user.uid })
        return exits ? !v.isDelete && v.status == 'active' && checkStartDate && moment().isBefore(v.endDate) : null;
      }
      return !v.isDelete && v.status == 'active' && checkStartDate && moment().isBefore(v.endDate);
    });
    data = _.orderBy(data, 'updatedAt', 'desc');
    data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
    notifyData.data= data;
  }
  return notifyData;
};

const getSONews = (state, getter, rootState) => {
  var soNewsData = { data: [], total: 0 };
  var data = [];
  if (state.soNews) {
    data = _.filter(state.soNews, (v) => {
      v.fromNowUpdate = v.updatedAt ? moment(v.updatedAt).fromNow() : '';
      v.updatedAtTime = v.updatedAt ? moment(v.updatedAt).format('HH:mm') : '';
      v.locale = rootState.locale;
      if (state.tables) {
        let table = _.find(state.tables, o => { return o.code == v.tableCode; });
        v.tableName = table.name;
        if (state.area) {
          let areaObj = _.find(state.area, (o1) => { return table.areaId == o1.id });
          v.areaName = areaObj.name;
        }
      }
      return v.status == 'processed';
    });
    data = _.orderBy(data, 'updatedAt', 'asc');
    soNewsData.total = data.length;
    soNewsData.data= data;
  }
  return soNewsData;
};

const getListArea = (state, getter, rootState) => {
  var areaData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.area, (v) => {
    v.locale = rootState.locale;
    return v;
  });
  data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder]);
  areaData.total = data.length;
  data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
  areaData.data= data;
  return areaData;
};

export default {
  getTable,
  getSONews,
  getListNotify,
  getListArea
};
