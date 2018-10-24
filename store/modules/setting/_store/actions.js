import _ from 'lodash'
import firebase from 'firebase'

const setCategory = async (context,request) =>{
  context.commit('SET_CATEGORY', { data: request ? request.data : [], total: request ? request.total : 0 });
}

const editCategory = async (context, request) => {
  var formData = {
    name: request.name
  }
  await firebase.database().ref('category').child(request.id).update(formData)
  .catch((err) => {
    console.log(err.message)
  })
};

const setArea = async (context,request) =>{
  context.commit('SET_AREA', { data: request ? request.data : [], total: request ? request.total : 0 });
}

const editArea = async (context, request) => {
  var formData = {
    name: request.name
  }
  await firebase.database().ref('area').child(request.id).update(formData)
  .catch((err) => {
    console.log(err.message)
  })
};

export default {
  setCategory,
  editCategory,
  setArea,
  editArea
};
