<template>
  <div class="col-md-12">
    <div class="row">

    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import firebase from 'firebase';
import titleBar from '~/components/TitleBar.vue';
export default {
	components: {
		titleBar
	},
	middleware: 'authenticated',
	data() {
		return {
		};
	},
	watch: {
	},
	computed: {
		...mapGetters({
		}),
		...mapState({
			searchRequest: state => state.listTableOrder.searchRequest
		})
	},
	async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'nvpc') {
		  redirect('/auth/signin');
		} else {
      // await store.dispatch('listTableOrder/getListArea');
      // await firebase.database().ref('/tables/').on('value', function(data) {
      //   var tableData = {data: [], total: 0};
      //   const obj = data.val();
      //   for (let key in obj) {
      //     tableData.total++;
      //     tableData.data.push({
      //       code: key,
      //       name: obj[key].name ? obj[key].name : '',
      //       seats: obj[key].seats ? obj[key].seats : 0,
      //       areaId: obj[key].areaId ? obj[key].areaId : '',
      //       status: obj[key].status ? obj[key].status : 'empty',
      //       weight: obj[key].weight,
      //       isDelete: obj[key].isDelete,
      //       createdAt: obj[key].createdAt ? obj[key].createdAt : '',
      //       updatedAt: obj[key].updatedAt ? obj[key].updatedAt : ''
      //     })
      //   }
      //   store.dispatch('listTableOrder/setTable', tableData);
      // });
    }
  },
  created() {
  },
	methods: {
    redirectTo: function(path) {
			if (path) {
				this.$router.push(path);
			} else {
				this.$router.go(-1);
			}
		},
    search: _.debounce(async function() {
			var _this = this;
			_this.searchRequest.description = _this.description;
    }, 500),
    chooseArea: _.debounce(async function(value) {
			var _this = this;
      _this.searchRequest.description = value;
    }, 200),
    chooseAllArea: _.debounce(async function() {
			var _this = this;
      _this.searchRequest.description = '';
    }, 200),
    clear(){
      this.description = '';
    }
	}
};
</script>
