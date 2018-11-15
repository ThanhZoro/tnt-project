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
          <div class="col-12-md" style="text-align:center">
            <div class="row">
              <div style="border: 2px red solid;padding-bottom: 30px; margin-top: 50px; border-radius: 20px;" class="col-md-4 col-md-offset-4 col-xs-12">
                <h3>{{userInfo.fullName}}</h3>
                <div>{{$t('userList.email')}}: {{userInfo.email}}</div>
                <div>{{$t('userList.phone')}}: {{userInfo.phoneNumber}}</div>
                <div>{{$t('userList.roleUser')}}: {{$t(userInfo.roleUser)}}</div>
                <a @click="logout" class="btn btn-danger" style="margin-top: 20px; margin-right: 20px">{{$t('signOut')}}</a>
                <nuxt-link :to="`/list-table`" class="btn btn-primary" style="margin-top: 20px;">{{$t('work')}}</nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-12-md" style="text-align:center; margin: 20px 0px 20px 0px; font-size: 23px; font-weight: bold; color: royalblue;">
            THÔNG BÁO
          </div>
          <div class="col-md-6 col-md-offset-3 col-xs-12" v-for="item in notifyData.data" :key="item.id">
            <div class="col-md-12 col-xs-12 panel panel-flat" style="text-align:left; padding: 10px;">
              <div class="col-md-12 col-xs-12  mb-5" style="font-size: 18px; font-weight: bold;">{{item.title}}</div>
              <div class="col-md-12 col-xs-12 mb-5"><i class="icon-pencil6" title="Nội dung"></i><span style="font-size: 15px; font-style: italic"> {{item.content}}</span> </div>
              <div class="col-md-12 col-xs-12 mb-5"><i class="icon-alarm-check" title="Ngày bắt đầu"></i> <span class="text-lv-2"> {{item.startDateTime}}</span>  -  <i class="icon-alarm-cancel" title="Ngày kết thúc"></i>  <span class="text-lv-2"> {{item.endDateTime}}</span></div>
              <div class="col-md-12 col-xs-12 mb-5" v-if="item.address"><i class="icon-location3" title="Địa điểm"></i>  <span class=" text-lv-2">{{item.address}}</span></div>
            </div>
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
          <div class="col-12-md" style="text-align:center">
            <div class="row">
              <div style="border: 2px red solid;padding-bottom: 30px; margin-top: 50px; border-radius: 20px;" class="col-md-4 col-md-offset-4 col-xs-12">
                <h3>{{userInfo.fullName}}</h3>
                <div>{{$t('userList.email')}}: {{userInfo.email}}</div>
                <div>{{$t('userList.phone')}}: {{userInfo.phoneNumber}}</div>
                <div>{{$t('userList.roleUser')}}: {{$t(userInfo.roleUser)}}</div>
                <a @click="logout" class="btn btn-danger" style="margin-top: 20px; margin-right: 20px">{{$t('signOut')}}</a>
                <nuxt-link :to="`/list-new-order`" class="btn btn-primary" style="margin-top: 20px;">{{$t('work')}}</nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-12-md" style="text-align:center; margin: 20px 0px 20px 0px; font-size: 23px; font-weight: bold; color: royalblue;">
            THÔNG BÁO
          </div>
          <div class="col-md-6 col-md-offset-3 col-xs-12" v-for="item in notifyData.data" :key="item.id">
            <div class="col-md-12 col-xs-12 panel panel-flat" style="text-align:left; padding: 10px;">
              <div class="col-md-12 col-xs-12  mb-5" style="font-size: 18px; font-weight: bold;">{{item.title}}</div>
              <div class="col-md-12 col-xs-12 mb-5"><i class="icon-pencil6" title="Nội dung"></i><span style="font-size: 15px; font-style: italic"> {{item.content}}</span> </div>
              <div class="col-md-12 col-xs-12 mb-5"><i class="icon-alarm-check" title="Ngày bắt đầu"></i> <span class="text-lv-2"> {{item.startDateTime}}</span>  -  <i class="icon-alarm-cancel" title="Ngày kết thúc"></i>  <span class="text-lv-2"> {{item.endDateTime}}</span></div>
              <div class="col-md-12 col-xs-12 mb-5" v-if="item.address"><i class="icon-location3" title="Địa điểm"></i>  <span class=" text-lv-2">{{item.address}}</span></div>
            </div>
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
import { mapState, mapGetters } from 'vuex';
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
    ...mapGetters({
			notifyData: 'listTableOrder/getListNotify'
		}),
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
    var _this = this;
		if (process.browser) {
			this.windowHeight = window.innerHeight - 48;
      await firebase.database().ref('/users/' + this.user.uid).once('value').then((data) => {
        this.userInfo = data.val();
      });
    }
    await firebase.database().ref('/notify/').on('value', function(data) {
      var notifyData = {data: [], total: 0};
      const obj = data.val();
      for (let key in obj) {
        notifyData.total++;
        notifyData.data.push({
          id: key,
          title: obj[key].title ? obj[key].title : '',
          content: obj[key].content ? obj[key].content : '',
          startDate: obj[key].startDate ? obj[key].startDate : '',
          endDate: obj[key].endDate ? obj[key].endDate : '',
          forAllUser: obj[key].forAllUser ? obj[key].forAllUser : '',
          sendTo: obj[key].sendTo ? obj[key].sendTo : '',
          notifyBefore: obj[key].notifyBefore,
          address: obj[key].address,
          status: obj[key].status,
          isDelete: obj[key].isDelete,
          createdAt: obj[key].createdAt ? obj[key].createdAt : '',
          createdBy: obj[key].createdBy ? obj[key].createdBy : '',
          updatedAt: obj[key].updatedAt ? obj[key].updatedAt : '',
          updatedBy: obj[key].updatedBy ? obj[key].updatedBy : ''
        })
      }
      _this.$store.dispatch('listTableOrder/setListNotify', notifyData);
    });
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

