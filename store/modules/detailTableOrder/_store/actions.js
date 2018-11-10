import  firebase from '@/services/fireinit.js';
import moment from 'moment';

const setTable = async (context, table) =>{
  context.commit('SET_TABLE', table ? table : {});
};

const createSO = async (context, request) => {
  let formData = {
    tableCode: request,
    total: 0,
    isDelete: false,
    createdAt: request.createdAt ? request.createdAt : moment().toISOString(),
    createdBy: context.rootState.auth.user.uid
  }
  await firebase.database().ref('so').push(formData).then(data => {
    let updateStatusTable = {
      status: 'full',
      currentSO: data.key
    }
    firebase.database().ref('tables').child(request).update(updateStatusTable)
  })
  .catch((err) => {
    console.log(err.message)
  })
  context.state.trigger = true;
};

const createBill = async (context, request) => {
  let formData = {
    status: 'empty',
    currentSO: ''
  }
  await firebase.database().ref('tables').child(request).update(formData)
  .catch((err) => {
    console.log(err.message)
  })
  await context.commit('CLEAR_DATA_DETAIL');
};

const getCurrentSO = async (context, request) => {
  await firebase.database().ref('so/' + request).once('value').then(data => {
    let currentSOData = data.val();
    currentSOData.code = data.key;
    context.commit('SET_CURRENT_SO', currentSOData);
  })
  .catch((err) => {
    console.log(err.message)
  })
};

const getListDish = async (context, request) => {
  await firebase.database().ref('/dishes/').once('value').then(data => {
    var dishData = [];
    const obj = data.val();
    for (let key in obj) {
      dishData.push({
        code: key,
        name: obj[key].name ? obj[key].name : '',
        price: obj[key].price ? obj[key].price : '',
        categoryId: obj[key].categoryId,
        unit: obj[key].unit,
        status: obj[key].status,
        pictureUrl: obj[key].pictureUrl,
        isDelete: obj[key].isDelete,
        createdAt: obj[key].createdAt ? obj[key].createdAt : '',
        updatedAt: obj[key].updatedAt ? obj[key].updatedAt : ''
      })
    }
    context.commit('SET_LIST_DISH', dishData);
  })
  .catch((err) => {
    console.log(err.message)
  })
};

const getListCategory = async (context, request) =>{
  var category = [];
  await firebase.database().ref('/category/').once('value').then((data) => {
    const obj = data.val();
    for (let key in obj) {
      category.push({
        id: key,
        name: obj[key].name,
        weight: obj[key].weight
      })
    }
  }).catch((err) => {
    console.log(err);
  })
  await context.commit('SET_CATEGORY', category);
};

const sendDish = async (context, request) => {
  let formData = {
    dishList: [],
    total: context.state.currentSO4Dish.total,
    updatedAt: moment().toISOString(),
    updatedBy: context.rootState.auth.user.uid,
  };

  let formDataSONew = {
    status: 'waitProcess',
    tableCode: context.state.currentSO4Dish.tableCode,
    createdAt: moment().toISOString(),
    createdBy: context.rootState.auth.user.uid,
  };
  _.forEach(context.state.currentSO4Dish.dishList, (o) => {
    if (o.quantity > 0) {
      formData.dishList.push({ code: o.code, quantity: o.quantity });
      if (o.quantity > o.originalQuantity) {
        formDataSONew.nameDish = o.name;
        formDataSONew.quantity = o.quantity - o.originalQuantity;
        formDataSONew.pictureUrlDish = o.pictureUrl;
        firebase.database().ref('soNew').push(formDataSONew)
        .catch((err) => {
          console.log(err.message)
        })
      }
    }
  })
  await firebase.database().ref('so/' + context.state.table.currentSO).update(formData)
  .catch((err) => {
    console.log(err.message)
  })

  await context.dispatch('getCurrentSO', context.state.table.currentSO);
  await context.commit('CHECK_CHANGE_VALUE');
};

const changeQuantityDish = async (context, request) => {
  await context.commit('UPDATE_CURRENT_SO_4_DISH', request);
  await context.commit('CHECK_CHANGE_VALUE');
};
const addNewDish = async (context, request) => {
  await context.commit('UP_CURRENT_SO_4_DISH', request);
  await context.commit('CHECK_CHANGE_VALUE');
};
const minusDish = async (context, request) => {
  await context.commit('DOWN_CURRENT_SO_4_DISH', request);
  await context.commit('CHECK_CHANGE_VALUE');
};
const clearDataDetail = async (context) => {
  await context.commit('CLEAR_DATA_DETAIL');
};

export default {
  setTable,
  createSO,
  getCurrentSO,
  getListDish,
  sendDish,
  getListCategory,
  changeQuantityDish,
  addNewDish,
  minusDish,
  clearDataDetail,
  createBill
};
