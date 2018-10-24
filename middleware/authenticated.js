import axios from 'axios';
import  firebase from 'firebase';
import _ from 'lodash';

export default function ({ store, redirect,route }) {
  if (!store.state.roleCurrentUser){
    if (store.state.auth.user && store.state.auth.user.uid) {
      firebase.database().ref('/users/' + store.state.auth.user.uid).once('value')
        .then((data) => {
          store.dispatch('setRoleCurrentUser', data.val().roleUser);
        })
        .catch((error) =>
          console.log(error)
        );
    } else {
      return redirect('/auth/signin')
    }
  }

  // if(axios.defaults.headers.common['Authorization'] == ""){
  //   var token = store.state.auth.user ? store.state.auth.user.qa: '';
  //   axios.defaults.headers.common['Authorization'] = token;
  // }
  if(route.path != "/auth/signin" && route.path != "/auth/signup"){
    if (!store.state.auth.user) {
      return redirect('/auth/signin')
    }
  }else{
    if (store.state.auth.user) {
      return redirect('/')
    }
  }
}
