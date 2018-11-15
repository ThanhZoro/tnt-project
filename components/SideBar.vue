<template>
  			<!-- Main sidebar -->
			<div class="sidebar sidebar-main">
				<div class="sidebar-content">
					<!-- Main navigation -->
					<div class="sidebar-category sidebar-category-visible">
						<div class="category-content no-padding">
							<ul class="navigation navigation-main navigation-accordion">

								<!-- Main -->
								<li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
								<nuxt-link tag="li" to="/setting" active-class="active"><a><i class="icon-cog4"></i> <span>{{$t('setting.title')}}</span></a></nuxt-link>
								<nuxt-link tag="li" to="/users" active-class="active"><a><i class="icon-users"></i> <span>{{$t('userList.users')}}</span></a></nuxt-link>
								<nuxt-link tag="li" to="/dishes" active-class="active"><a><i class="icon-cup2"></i> <span>{{$t('dish.title')}}</span></a></nuxt-link>
								<nuxt-link tag="li" to="/tables" active-class="active"><a><i class=" icon-chair"></i> <span>{{$t('table.title')}}</span></a></nuxt-link>
								<nuxt-link tag="li" to="/list-notify" active-class="active"><a><i class=" icon-bubble-notification"></i> <span>{{$t('listNotify.title')}}</span></a></nuxt-link>
							</ul>
						</div>
					</div>
					<!-- /main navigation -->

				</div>
			</div>
			<!-- /main sidebar -->
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      hideMenu: state => state.hideMenu
    })
  },
  created() {},
  methods: {
    toggleSidebar: function() {
      var _this = this;
      _this.$store.dispatch("hideMenu");
    }
  }
};
</script>
