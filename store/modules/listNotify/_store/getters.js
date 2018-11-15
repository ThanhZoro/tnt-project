import _ from 'lodash'
import moment from 'moment';
import commonData from '~/utils/common-data'

const getListNotify = (state, getter, rootState) => {
  var notifyData = { data: [], total: 0 };
  var data = [];
  if (state.listNotify) {
    data = _.filter(state.listNotify, (v) => {
      v.startDateTime = v.startDate ? moment(v.startDate).format('HH:mm - DD/MM/YYYY') : '';
      v.endDateTime = v.endDate ? moment(v.endDate).format('HH:mm - DD/MM/YYYY') : '';
      let dataStatus = _.find(commonData.statusNotify, o => { return o.value == v.status });
      v.statusColor = dataStatus.color;
      return !v.isDelete && v.title.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1;
    });
    data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder]);
    notifyData.total = data.length;
    data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
    notifyData.data= data;
  }
  return notifyData;
};
export default {
  getListNotify
};
