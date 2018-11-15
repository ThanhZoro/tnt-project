import  firebase from '@/services/fireinit.js';
import moment from 'moment';

const getListUser = async (context, request) =>{
  await firebase.database().ref('/users/').once('value').then((data) => {
    var userData = {data: [], total: 0};
    const obj = data.val();
    for (let key in obj) {
      userData.total++;
      userData.data.push({
        id: key,
        fullName: obj[key].fullName ? obj[key].fullName : '',
        phoneNumber: obj[key].phoneNumber ? obj[key].phoneNumber : '',
        email: obj[key].email,
        roleUser: obj[key].roleUser,
        isDelete: obj[key].isDelete,
        createdAt: obj[key].createdAt ? obj[key].createdAt : '',
        updatedAt: obj[key].updatedAt ? obj[key].updatedAt : ''
      })
    }
    context.commit('SET_LIST_USER', userData);
  });
};
const getNotify = async (context, request) =>{
  var notify = {};
  await firebase.database().ref('/notify/' + request).once('value').then((data) => {
    notify = data.val();
    notify.id = data.key;
  }).catch((err) => {
    console.log(err);
  })
  return notify;
};

const createNotify = async (context, request) => {
  var formData = {
    title: request.title,
    forAllUser: request.forAllUser,
    sendTo: request.sendTo,
    status: request.status,
    startDate:  moment(request.startDate).toISOString(),
    endDate:  moment(request.endDate).toISOString(),
    content: request.content,
    notifyBefore: request.notifyBefore ? request.notifyBefore : 1,
    address: request.address ? request.address : '',
    isDelete: false,
    createdAt: moment().toISOString(),
    createdBy: context.rootState.auth.user.uid,
    updatedAt: moment().toISOString(),
    updatedBy: context.rootState.auth.user.uid
  }
  await firebase.database().ref('notify').push(formData)
  .catch((err) => {
    console.log(err.message)
  })
};

const updateNotify = async (context, request) => {
  var formData = {
    title: request.title,
    forAllUser: request.forAllUser,
    sendTo: request.sendTo,
    status: request.status,
    startDate:  moment(request.startDate).toISOString(),
    endDate:  moment(request.endDate).toISOString(),
    content: request.content,
    notifyBefore: request.notifyBefore ? request.notifyBefore : 1,
    address: request.address ? request.address : '',
    isDelete: false,
    createdAt: request.createdAt,
    createdBy: request.createdBy,
    updatedAt: moment().toISOString(),
    updatedBy: context.rootState.auth.user.uid
  }
  await firebase.database().ref('notify').child(request.id).update(formData)
  .catch((err) => {
    console.log(err.message)
  })
};

export default {
  getListUser,
  updateNotify,
  createNotify,
  getNotify
};
