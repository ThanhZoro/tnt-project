<template>
  <div>
    <div :class="hideMenu ? 'sidebar-xs sidebar-mobile-main' : ''" v-if="roleCurrentUser == 'owner' || roleCurrentUser == 'admin'">
      <!-- Main navbar -->
      <nav-bar />
      <!-- /main navbar -->
      <!-- Page container -->
      <div class="page-container" :style="`min-height:${windowHeight}px;`">

        <!-- Page content -->
        <div :class="`page-content ${hideMenu ? 'sidebar-main' : ''}`">
          <!-- Main sidebar -->
          <side-bar />
          <!-- /main sidebar -->
          <!-- Main content -->
          <nuxt />
          <!-- /main content -->
        </div>
        <!-- /page content -->
      </div>
      <!-- /page container -->
    </div>
    <div v-else-if="roleCurrentUser == 'nvpv'">
       <div class="page-container" :style="`min-height:${windowHeight}px;`">
        <!-- Page content -->
        <div class="page-content">
         <center class="container" v-if="$nuxt.$route.path == '/'">
          <div style="border: 2px red solid;padding-bottom: 30px; margin-top: 50px; border-radius: 20px;" class="col-md-4 col-md-offset-4">
            <h3>{{userInfo.fullName}}</h3>
            <div>{{$t('userList.email')}}: {{userInfo.email}}</div>
            <div>{{$t('userList.phone')}}: {{userInfo.phoneNumber}}</div>
            <div>{{$t('userList.roleUser')}}: {{$t(userInfo.roleUser)}}</div>
            <a  @click="logout" class="btn btn-danger" style="margin-top: 20px; margin-right: 20px">{{$t('signOut')}}</a>
            <nuxt-link :to="`/list-table`" class="btn btn-primary" style="margin-top: 20px;">{{$t('work')}}</nuxt-link>
          </div>
        </center>
          <!-- Main content -->
          <nuxt />
          <!-- /main content -->
        </div>
        <!-- /page content -->
      </div>
    </div>
    <div v-else-if="roleCurrentUser == 'nvpc'">
       <div class="page-container" :style="`min-height:${windowHeight}px;`">
        <!-- Page content -->
        <div class="page-content">
         <center class="container" v-if="$nuxt.$route.path == '/'">
          <div style="border: 2px red solid;padding-bottom: 30px; margin-top: 50px; border-radius: 20px;" class="col-md-4 col-md-offset-4">
            <h3>{{userInfo.fullName}}</h3>
            <div>{{$t('userList.email')}}: {{userInfo.email}}</div>
            <div>{{$t('userList.phone')}}: {{userInfo.phoneNumber}}</div>
            <div>{{$t('userList.roleUser')}}: {{$t(userInfo.roleUser)}}</div>
            <a  @click="logout" class="btn btn-danger" style="margin-top: 20px; margin-right: 20px">{{$t('signOut')}}</a>
            <nuxt-link :to="`/list-new-order`" class="btn btn-primary" style="margin-top: 20px;">{{$t('work')}}</nuxt-link>
          </div>
        </center>
          <!-- Main content -->
          <nuxt />
          <!-- /main content -->
        </div>
        <!-- /page content -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from '~/components/NavBar.vue';
import SideBar from '~/components/SideBar.vue';
import firebase from 'firebase';
export default {
  layout: 'authenticate',
	components: {
		NavBar,
		SideBar
	},
	computed: {
		...mapState({
			hideMenu: state => state.hideMenu,
      roleCurrentUser: state => state.roleCurrentUser,
      user: state => state.auth.user
		})
	},
	data() {
		return {
      windowHeight: 800,
      userInfo: {}
		};
  },
	async created() {
		if (process.browser) {
			this.windowHeight = window.innerHeight - 48;
      await firebase.database().ref('/users/' + this.user.uid).once('value').then((data) => {
        this.userInfo = data.val();
      });
    }
  },
  methods: {
    logout: async function(){
      var _this = this;
      await _this.$store.dispatch('auth/logout');
      await _this.$store.dispatch('setRoleCurrentUser', '');
      _this.$router.push('/auth/signin');
    }
	}
};
</script>

