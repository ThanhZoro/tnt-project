import _ from 'lodash'
import firebase from 'firebase'
import moment from 'moment';

const setTable = async (context, request) => {
  context.commit('SET_TABLE', { data: request ? request.data : null, total: request ? request.total : 0 });
};
const setSONew = async (context, request) => {
  context.commit('SET_SO_NEW', { data: request ? request.data : null, total: request ? request.total : 0 });
};

const setListNotify = async (context, request) => {
  context.commit('SET_LIST_NOTIFY', { data: request ? request.data : null, total: request ? request.total : 0 });
};

const getListArea = async (context, request) =>{
  var area = [];
  await firebase.database().ref('/area/').once('value').then((data) => {
    const obj = data.val();
    for (let key in obj) {
      area.push({
        id: key,
        name: obj[key].name,
        weight: obj[key].weight,
      })
    }
  }).catch((err) => {
    console.log(err);
  })
  context.commit('SET_AREA', area);
};

const deleteTables = async (context, request) =>{
  _.forEach(request.ids, (o) => {
    firebase.database().ref('tables').child(o).update({ isDelete: true });
  })
}
const serveDone = async (context, request) => {
  let formData = {
    status: 'done',
    checkDoneAt: moment().toISOString(),
    checkDoneBy: context.rootState.auth.user.uid,
  }
  let formDataHistory = {
    status: 'serveForCustomer',
    type: 'nvpv',
    data: {
      tableCode: request.tableCode,
      nameDish: request.nameDish,
      quantity: request.quantity,
    },
    createdAt: moment().toISOString(),
    createdBy: context.rootState.auth.user.uid,
  }
  await firebase.database().ref('soNew').child(request.code).update(formData).then(data => {
    firebase.database().ref('history').push(formDataHistory)
  })
  .catch((err) => {
    console.log(err.message)
  })
};


export default {
  setSONew,
  setListNotify,
  deleteTables,
  setTable,
  getListArea,
  serveDone
};
