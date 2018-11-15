import _ from 'lodash'
import firebase from 'firebase'

const setListNotify = async (context, request) => {
  context.commit('SET_LIST_NOTIFY', { data: request ? request.data : null, total: request ? request.total : 0 });
};
const showHideCols = async (context, request) => {
    context.commit('SHOW_HIDE_COLS', request);
};
const deleteNotify = async (context, request) =>{
  _.forEach(request.ids, (o) => {
    firebase.database().ref('notify').child(o).update({ isDelete: true });
  })
}

export default {
    showHideCols,
    deleteNotify,
    setListNotify
};
