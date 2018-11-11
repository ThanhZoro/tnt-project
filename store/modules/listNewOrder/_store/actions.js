import _ from 'lodash'
import firebase from 'firebase'
import moment from 'moment';

const setListSO = async (context, request) => {
  context.commit('SET_LIST_SO', { data: request ? request.data : null, total: request ? request.total : 0 });
};
const cookDone = async (context, request) => {
  let formData = {
    status: 'processed',
    updatedAt: moment().toISOString(),
    updatedBy: context.rootState.auth.user.uid,
  }
  await firebase.database().ref('soNew').child(request.code).update(formData)
  .catch((err) => {
    console.log(err.message)
  })
};

export default {
  setListSO,
  cookDone
};
