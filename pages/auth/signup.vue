<template>
  <div>
    <section class="container" style="max-width: 300px !important">
      <h2>
        Đăng ký
      </h2>
      <div class="form-group">
        <label for="usernameTxt">Email:</label>
        <input  class="form-control" type="text" v-model="email">
      </div>
      <div class="form-group">
        <label for="passwordTxt">Mật khẩu:</label>
        <input class="form-control" type="password" v-model="password">
      </div>
      <button type="submit" class="btn btn-info" :disabled="email == '' || password == ''" v-on:keyup.enter="signUp()" @click="signUp()">Đăng ký</button>
    </section>
  </div>

</template>


<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'
import moment from 'moment';

export default {
  layout: 'authenticate',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signUp () {
      try {
        var _this = this;
        const firebaseUser = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
          firebase.database().ref('users').child(user.uid).set({ email: user.email, roleUser: "admin", isDelete: false, createdAt: moment().toISOString()}).then((data) => {
              console.log("Created successful user");
              console.log(data)
            }
          )
          .catch((err) => {
            console.log(err.message)
          })
        },err=>{
          console.log(err);
        });
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped>
  form {
    padding: 16px;
  }
  button {
    width: 100%;
  }
  .container {
    padding: 16px;
    max-width: 400px;
  }

</style>

