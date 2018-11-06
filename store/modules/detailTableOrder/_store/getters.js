import _ from 'lodash'
import moment from 'moment';
import commonFunc from '~/utils/common-func'

const getTable = (state, getter, rootState) => {
  return state.table;
};

const getCurrentSO = (state, getter, rootState) => {
  let data = state.currentSO;
  let total = 0;
  data.dishList =  _.filter(data.dishList, (v) => {
    let dishData = _.find(state.listDish.data, (o) => { return v.code == o.code });
    v.name = dishData.name;
    v.price = dishData.price;
    v.pictureUrl = dishData.pictureUrl;
    v.unit = dishData.unit;
    total += v.price * v.quantity;
    return v.quantity != 0;
  })
  data.total = total;
  data.stringTotal = commonFunc.formatMoneyToString(total);
  return data;
};

const getCategory = (state, getter, rootState) => {
  var categoryData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.category, (v) => {
    v.locale = rootState.locale;
    return v;
  });
  data = _.orderBy(data, [function (o) { return o[state.searchRequest.sort.field] || ''; }], [state.searchRequest.sort.sortOrder]);
  categoryData.total = data.length;
  data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
  categoryData.data= data;
  return categoryData;
};

const getListDish = (state, getter, rootState) => {
  var dishData = { data: [], total: 0 };
  var data = [];
  data = _.filter(state.listDish.data, (v) => {
    let dishSO = _.find(state.currentSO4Dish.dishList, (o) => { return v.code == o.code; })
    v.quantity = dishSO ? dishSO.quantity : 0;
    return (v.isDelete == false && v.status == 'active' &&
            (v.code.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.name.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1 ||
            v.categoryId.toLowerCase().indexOf(state.searchRequest.description.toLowerCase()) > -1));
  });
  data = _.orderBy(data, 'name', 'desc');
  dishData.total = data.length;
  data = _.take(_.drop(data, (state.searchRequest.currentPage - 1) * state.searchRequest.pageSize), state.searchRequest.pageSize);
  dishData.data= data;
  return dishData;
};

export default {
  getTable,
  getCurrentSO,
  getCategory,
  getListDish
};
