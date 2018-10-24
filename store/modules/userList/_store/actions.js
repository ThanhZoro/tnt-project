import _ from 'lodash'
import firebase from 'firebase'

const setUsers = async (context, request) => {
  context.commit('SET_USERS', { data: request ? request.data : null, total: request ? request.total : 0 });
};
const showHideCols = async (context, request) => {
    context.commit('SHOW_HIDE_COLS', request);
};
const deleteUsers = async (context, request) =>{
  _.forEach(request.ids, (o) => {
    firebase.database().ref('users').child(o).update({ isDelete: true });
  })
}

export default {
    showHideCols,
    deleteUsers,
    setUsers
};
