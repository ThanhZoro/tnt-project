import _ from 'lodash'
import firebase from 'firebase'

const setDishes = async (context, request) => {
  context.commit('SET_DISHES', { data: request ? request.data : null, total: request ? request.total : 0 });
};
const showHideCols = async (context, request) => {
    context.commit('SHOW_HIDE_COLS', request);
};
const deleteDish = async (context, request) =>{
  firebase.database().ref('dishes').child(request).update({ isDelete: true });
}

export default {
    showHideCols,
    deleteDish,
    setDishes
};
