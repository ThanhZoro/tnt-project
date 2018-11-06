import _ from 'lodash'
import firebase from 'firebase'

const setTable = async (context, request) => {
  context.commit('SET_TABLE', { data: request ? request.data : null, total: request ? request.total : 0 });
};
const showHideCols = async (context, request) => {
  context.commit('SHOW_HIDE_COLS', request);
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

export default {
    showHideCols,
    deleteTables,
    setTable,
    getListArea
};
