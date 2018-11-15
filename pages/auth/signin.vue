<template>
  <div class="container" >
    <div style="max-width: 300px !important" v-if="$store.state.loadingFinish">
      <h2>
        Đăng nhập
      </h2>
      <div :class="`form-group `">
        <label for="usernameTxt">Email:</label>
        <input class="form-control" type="text" v-model="email" name="email">
      </div>
      <div class="form-group">
        <label for="passwordTxt">Mật khẩu:</label>
        <input class="form-control" type="password" v-model="password">
      </div>
      <button type="submit" class="btn btn-info" :disabled="email == '' || password == ''" v-on:keyup.enter="submit()" @click="submit()" style="margin-bottom: 15px;">Đăng nhập</button>
      <!-- <button type="button" class="btn btn-primary" @click="loginWithFaceBook" style="margin-bottom: 15px;">Đăng nhập với Facebook</button> -->
      <button type="button" class="btn btn-danger" @click="loginWithGoogle">Đăng nhập với Google</button>
    </div>
    <div class="loading-page" v-else><i class="el-icon-loading"></i> Đang tải...</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import _ from 'lodash';
import firebase from 'firebase';

export default {
	layout: 'authenticate',
	data() {
		return {
			email: '',
			password: ''
		};
	},
	async created() {
		var _this = this;
    var user = _this.$store.state.auth.user;
		if (user) {
			await _this.$store.dispatch('auth/login', user);
			_this.$router.push('/');
		} else {
			if (!process.server) {
				await _this.$store.dispatch('setLoadingFinish', true);
			} else {
				await _this.$store.dispatch('setLoadingFinish', false);
			}
		}
	},
	methods: {
		submit: _.debounce(async function() {
			var _this = this;
			await firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then(user => {
					return _this.$store.dispatch('auth/login', user);
				})
				.then(() => {
					_this.$router.push('/');
				})
				.catch(error => {
					_this.$notify.error({
						message: _this.$t(error.code)
					});
					console.log(error);
				});
		}, 500),
		loginWithFaceBook: async function() {
			var _this = this;
			_this.$store
				.dispatch('auth/signInWithFacebook')
				.then(() => {
					console.log('inside then statement on login');
				})
				.catch(e => {
					console.log(e);
        });
		},
		loginWithGoogle: async function() {
      var _this = this;
			_this.$store
				.dispatch('auth/signInWithGoogle')
				.then(() => {
          console.log('inside then statement on login');
				})
				.catch(e => {
          console.log(e.message);
				});
		}
	}
};
</script>


<style scoped>
form {
	padding: 16px;
}

button {
	width: 100%;
	margin-bottom: 10px;
}

.container {
	padding: 16px;
	max-width: 400px;
}
.loading-page {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.8);
	text-align: center;
	padding-top: 200px;
	font-size: 30px;
	font-family: sans-serif;
}
</style>
