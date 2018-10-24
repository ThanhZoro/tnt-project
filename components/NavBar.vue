<template>
  <!-- Main navbar -->
  <div class="navbar navbar-inverse">
    <div class="navbar-header">
      <nuxt-link class="navbar-brand" to="/"><img src="~/assets/images/logo.png" style="display: inline-block;" class="mr-1"><span style="display: inline-block;" >TNT-Project</span></nuxt-link>
        <ul class="nav navbar-nav visible-xs-block">
          <li>
            <a data-toggle="collapse" data-target="#navbar-mobile">
              <i class="icon-tree5"></i>
            </a>
          </li>
          <li @click="toggleSidebar">
            <a class="sidebar-mobile-main-toggle">
              <i class="icon-paragraph-justify3"></i>
            </a>
          </li>
        </ul>
    </div>
    <div class="navbar-collapse collapse" id="navbar-mobile">
      <ul class="nav navbar-nav">
        <li @click="toggleSidebar">
          <a class="sidebar-control sidebar-main-toggle hidden-xs">
            <i class="icon-paragraph-justify3"></i>
          </a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown language-switch">
          <a class="dropdown-toggle" data-toggle="dropdown">
            {{lang == 'vi' ? 'Tiếng việt' : 'English'}}
            <span class="caret"></span>
          </a>

          <ul class="dropdown-menu">
            <li>
              <a class="deutsch" @click="changeLang"> {{lang == 'vi' ? 'English' : 'Tiếng việt'}}</a>
            </li>
          </ul>
        </li>
        <li class="dropdown dropdown-user">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <img :src="user ? user.picture: ''" alt="">
            <span>{{user ? user.email : ''}}</span>
            <i class="caret"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <li>
              <a>
                <i class="icon-user-plus"></i> My profile</a>
            </li>
            <li>
              <a>
                <i class="icon-coins"></i> My balance</a>
            </li>
            <li>
              <a>
                <span class="badge bg-teal-400 pull-right">58</span>
                <i class="icon-comment-discussion"></i> Messages</a>
            </li>
            <li class="divider"></li>
            <li>
              <a>
                <i class="icon-cog5"></i> Account settings</a>
            </li>
            <li>
              <a @click="logout">
                <i class="icon-switch2"></i> Logout</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- /main navbar -->
</template>

<script>
import { mapState } from 'vuex';
export default {
	components: {},
	computed: {
		...mapState({
			user: state => state.auth.user,
			lang: state => state.locale
		})
	},
	created() {
    var _this = this;
  },
  mounted(){
    var myBodyOBJ = document.body || document.getElementsByTagName("body")[0];
      myBodyOBJ.onscroll = function (e) {
        var thead = document.querySelector('thead');
        var table = document.querySelector('table') ? document.querySelector('table') .getBoundingClientRect() : null;
        if (thead && table) {
          var top = table.top;
          if (top <= 0) {
            thead.style.transform = 'translateY(' + -(top) + 'px)';
          } else {
            thead.style.transform = 'translateY(' + 0 + 'px)';
          }
        }
      };
  },
	methods: {
		toggleSidebar: function() {
			var _this = this;
			_this.$store.dispatch('hideMenu');
		},
		changeLang: function() {
			var _this = this;
			var lang = _this.lang == 'vi' ? 'en' : 'vi';
      _this.$store.dispatch('setLang', lang);
    },
    logout: async function(){
      var _this = this;
      await _this.$store.dispatch('auth/logout');
      await _this.$store.dispatch('setRoleCurrentUser', '');
      _this.$router.push('/auth/signin');
    }
	}
};
</script>
