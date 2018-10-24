import _ from 'lodash'
import moment from 'moment';
import commonData from '~/utils/common-data'

const getTable = (state, getter, rootState) => {
  var tableData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.tables, (v) => {
    v.fromNowCreate = v.createdAt ? moment(v.createdAt).fromNow() : '';
    v.fromNowUpdate = v.updatedAt ? moment(v.updatedAt).fromNow() : '';
    let areaObj = _.find(state.area, (o) => { return v.areaId == o.id });
    v.areaName = areaObj.name;
    v.locale = rootState.locale;
    return (!v.isDelete &&
            (v.code.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.name.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.areaId.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.status.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1));
  });
  data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder]);
  tableData.total = data.length;
  data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
  tableData.data= data;
  return tableData;
};
export default {
  getTable
};
