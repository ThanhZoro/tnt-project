import  firebase from '@/services/fireinit.js';
import moment from 'moment';

const getUser = async (context, request) =>{
  var user = {};
  await firebase.database().ref('/users/' + request).once('value').then((data) => {
    user = data.val();
    user.id = data.key;
  }).catch((err) => {
    console.log(err);
  })
  return user;
};
const createUser = async (context, request) => {
  var formData = {
    email: request.email,
    fullName: request.fullName,
    phoneNumber: request.phoneNumber,
    roleUser: request.roleUser,
    isDelete: false,
    createdAt: moment().toISOString()
  }
  await firebase.auth().createUserWithEmailAndPassword(request.email, request.password).then(user => {
    firebase.database().ref('users').child(user.uid).set(formData).then((data) => {
        console.log("Created successful user");
      }
    )
    .catch((err) => {
      console.log(err.message)
    })
  },err=>{
    console.log(err);
  });
};

const updateUser = async (context, request) => {
  var formData = {
    fullName: request.fullName,
    phoneNumber: request.phoneNumber,
    roleUser: request.roleUser,
    updatedAt: moment().toISOString()
  }
  await firebase.database().ref('users').child(request.id).update(formData).then((data) => {
      console.log("Updated successful user");
    }
  )
  .catch((err) => {
    console.log(err.message)
  })
};

export default {
	createUser,
  updateUser,
  getUser
};
