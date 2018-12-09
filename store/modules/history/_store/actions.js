import _ from 'lodash'
import firebase from 'firebase'

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

const setHistory = async (context, request) => {
  context.commit('SET_HISTORY', { data: request ? request.data : null, total: request ? request.total : 0 });
};

export default {
  getListUser,
  setHistory
};
