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
       <nav-bar />
       <div class="page-container" :style="`min-height:${windowHeight}px;`">

        <!-- Page content -->
        <div class="page-content">
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
export default {
  layout: 'authenticate',
	components: {
		NavBar,
		SideBar
	},
	computed: {
		...mapState({
			hideMenu: state => state.hideMenu,
			roleCurrentUser: state => state.roleCurrentUser
		})
	},
	data() {
		return {
			windowHeight: 800
		};
	},
	created() {
		if (process.browser) {
			this.windowHeight = window.innerHeight - 48;
    }
	}
};
</script>

