<template>
  <div class="col-md-12">
    <div class="row">
      <div class="form-group has-feedback">
        <input class="form-control" style="height: 50px" v-model="description" @focus="clear" v-on:keyup.enter="search()" :placeholder="$t('table.searchDes')">
        <div class="form-control-feedback" style="margin-top: 7px">
          <i class="icon-search4"></i>
        </div>
      </div>
      <div class="col-md-12 col-xs-12" style="text-align: left; padding: 0px 0px 0px 20px;margin-bottom: 10px">
        <div @click="redirectTo('/')" class="button-back btn pointer">Trở về</div>
      </div>
      <div class="col-md-2 col-xs-5" style="padding: 20px;" @click="chooseAllArea">
        <div :class="`area-in-list pointer ${searchRequest.description == '' ? 'active-area' : ''}`">
          <span>{{$t('all')}}</span>
        </div>
      </div>
      <div class="col-md-2 col-xs-5" style="padding: 20px;" v-for="itemArea in areaData.data" :key="itemArea.id" @click="chooseArea(itemArea.id)">
        <div :class="`area-in-list pointer ${searchRequest.description == itemArea.id ? 'active-area' : ''}`">
          <span>{{itemArea.name}}</span>
        </div>
      </div>
      <div class="col-md-12 col-xs-12" style="padding: 0px">
        <hr>
      </div>
      <div class="col-md-2 col-xs-4" style="padding: 20px" v-for="item in tableData.data" :key="item.code">
        <div :class="`table-in-list ${item.status != 'notUse' ? 'pointer' : 'no-drop' }`"
            @click="item.status != 'notUse' ? redirectTo('/list-table/detail/' + item.code) : ''"
            v-bind:style="{ border: item.status == 'empty' ? '2px #2dd400 solid' : (item.status == 'full' ? '2px #ff1d1d solid' : (item.status == 'order' ? '2px #ffa90b solid' : '2px black solid'))}">
          <span>{{item.name}}</span>
        </div>
      </div>
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
			description: '',
			isCheckAll: false,
      ids: [],
		};
	},
	watch: {
    "description": _.debounce(function(val) {
			this.searchRequest.description = val;
		}, 100),
	},
	computed: {
		...mapGetters({
      tableData: 'listTableOrder/getTable',
      areaData: 'listTableOrder/getListArea'
		}),
		...mapState({
			searchRequest: state => state.listTableOrder.searchRequest
		})
	},
	async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'nvpv') {
		  redirect('/auth/signin');
		} else {
      await store.dispatch('listTableOrder/getListArea');
      await firebase.database().ref('/tables/').on('value', function(data) {
        var tableData = {data: [], total: 0};
        const obj = data.val();
        for (let key in obj) {
          tableData.total++;
          tableData.data.push({
            code: key,
            name: obj[key].name ? obj[key].name : '',
            seats: obj[key].seats ? obj[key].seats : 0,
            areaId: obj[key].areaId ? obj[key].areaId : '',
            status: obj[key].status ? obj[key].status : 'empty',
            weight: obj[key].weight,
            isDelete: obj[key].isDelete,
            createdAt: obj[key].createdAt ? obj[key].createdAt : '',
            updatedAt: obj[key].updatedAt ? obj[key].updatedAt : ''
          })
        }
        store.dispatch('listTableOrder/setTable', tableData);
      });
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
