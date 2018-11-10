import _ from 'lodash'
import moment from 'moment';
import commonData from '~/utils/common-data'

const getListNewOrder = (state, getter, rootState) => {
  var newOrderData = { data: [], total: 0 };
  var data = [];
  if (state.listNewOrder) {
    data = _.filter(state.listNewOrder, (v) => {
      v.locale = rootState.locale;
      v.fromNowCreate = v.createdAt ? moment(v.createdAt).fromNow() : '';
      v.createdAtTime = v.createdAt ? moment(v.createdAt).format('HH:mm') : '';
      if (v.status  == 'waitProcess') {
        newOrderData.total += v.quantity;
      }
      return v.status == 'waitProcess';
    });
    data = _.orderBy(data, 'createdAt', 'asc');
    newOrderData.data= data;
  }
  return newOrderData;
};
export default {
  getListNewOrder
};
