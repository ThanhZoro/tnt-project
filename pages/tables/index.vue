<template>
  <div>
    <titleBar :langTitle="$t('table.title')" />
    <div class="content">
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('table.title')}}</h5>
          <div class="heading-elements">
            <el-dropdown @command="handleSort" trigger="click" class="mr-1">
              <el-button size="medium" class="btn fontDefault">
                {{$t('sort.name')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'createdAt' && searchRequest.sort.sortOrder == 'desc' ) }" command='{"field": "createdAt","sortOrder":"desc"}'>{{$t('sort.createdDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'createdAt' && searchRequest.sort.sortOrder == 'asc' ) }" command='{"field": "createdAt","sortOrder":"asc"}'>{{$t('sort.createdAsc')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'updatedAt' && searchRequest.sort.sortOrder == 'desc' ) }" command='{"field": "updatedAt","sortOrder":"desc"}'>{{$t('sort.updatedDes')}}</el-dropdown-item>
                <el-dropdown-item v-bind:class="{ dropdownSelect: (searchRequest.sort.field == 'updatedAt' && searchRequest.sort.sortOrder == 'asc' ) }" command='{"field": "updatedAt","sortOrder":"asc"}'>{{$t('sort.updatedAsc')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleShowHide" trigger="click" class="mr-1">
              <el-button size="medium" class="btn fontDefault">
                {{$t('showHideCols')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(item, props, index) in headers" style="width:180px">
                  <el-dropdown-item :key="index" :command="{props: props, item: item}">{{$t('table'+'.'+props) }}
                    <i v-show="item" class="el-icon-check mt-10 ml-20" style="float:right;"></i>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <button class="btn btn-primary" @click="redirectTo('/tables/edit')">
              {{$t('createNew')}}
            </button>
          </div>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input class="form-control" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('table.searchDes')">
                  <div class="form-control-feedback">
                    <i class="icon-search4"></i>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form-group">
                  <button type="button" size="medium" class="btn btn-primary" @click="search()">
                    {{$t('search')}}
                  </button>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group text-right">
                  <button type="button" v-if="ids.length" size="medium" class="btn bg-slate-400 mr-5" @click="deleteTable(ids)">
                    {{$t('delete')}}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-cont" id="table-cont">
              <table class="table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" class="custorm-checkbox" v-model="isCheckAll" />
                    </th>
                    <template v-for="(item, props, index) in headers">
                      <template v-if="props=='name'">
                        <th :key="index" v-show="item">{{$t(`table.${props}`)}}</th>
                        <th :key="`${index}-m`"></th>
                      </template>
                      <template v-else>
                        <th :key="index" v-show="item">{{$t(`table.${props}`)}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in tableData.data" :key="i" :value="item">
                    <td><input type="checkbox" class="custorm-checkbox" :value="item.code" v-model="ids" /></td>
                    <td v-show="headers['code']" style="min-width:120px;">
                      {{item.code ? item.code: $t('notAvailable')}}
                    </td>
                    <td v-show="headers['name']" style="min-width:180px;">
                      <nuxt-link :to="`/tables/edit/${item.code}`">
                        {{item.name ? item.name: $t('notAvailable')}}
                      </nuxt-link>
                    </td>
                    <td style="min-width:100px">
                      <div :title="$t('table.updateTable')" class="display-inline">
                        <nuxt-link :to="`/tables/edit/${item.code}`">
                          <i class="icon-pencil7"></i>
                        </nuxt-link>
                      </div>
                    </td>
                    <td v-show="headers['seats']" style="min-width:120px;">
                      {{item.seats ? item.seats : $t('notAvailable')}}
                    </td>
                    <td v-show="headers['area']" style="min-width:120px;">
                      {{item.areaName ? item.areaName : $t('notAvailable')}}
                    </td>
                    <td v-show="headers['status']" style="min-width:120px;">
                      {{$t('table.' + item.status) ? $t('table.' + item.status) : $t('notAvailable')}}
                    </td>
                    <td v-show="headers['createdAt']" style="min-width:200px">
                      <span class="display-block text-lv-3"> {{item.fromNowCreate}}</span>
                    </td>
                    <td v-show="headers['updatedAt']" style="min-width:200px">
                      <span class="display-block break-word text-lv-3">{{item.fromNowUpdate}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <el-pagination class="ml-4"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page.sync="searchRequest.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="searchRequest.pageSize"
              layout="sizes, prev, pager, next , jumper"
              :total="tableData.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!tableData.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{tableData.total}} {{$t('row')}}</div>
          </div>
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
		isCheckAll: function(val) {
			var _this = this;
			_this.ids = val
				? _.map(_this.tableData.data, o => {
						return o.code;
				  })
				: [];
		}
	},
	computed: {
		...mapGetters({
			tableData: 'tableList/getTable'
		}),
		...mapState({
			headers: state => state.tableList.headers,
			searchRequest: state => state.tableList.searchRequest
		})
	},
	async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'admin') {
		  redirect('/auth/signin');
		} else {
      await store.dispatch('tableList/getListArea');
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
            isDelete: obj[key].isDelete,
            createdAt: obj[key].createdAt ? obj[key].createdAt : '',
            updatedAt: obj[key].updatedAt ? obj[key].updatedAt : ''
          })
        }
        store.dispatch('tableList/setTable', tableData);
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
		handleSizeChange: _.debounce(async function(val) {
			var _this = this;
			_this.searchRequest.pageSize = val;
		}, 500),
		handleCurrentChange: _.debounce(async function(val) {
			var _this = this;
			_this.searchRequest.currentPage = val;
		}, 500),
		handleSort: _.debounce(async function(sortDesc) {
			var _this = this;
			_this.searchRequest.sort = JSON.parse(sortDesc);
		}, 500),
		async handleShowHide(command) {
			var _this = this;
			await _this.$store.dispatch('tableList/showHideCols', command);
		},
		search: _.debounce(async function() {
			var _this = this;
			_this.searchRequest.description = _this.description;
		}, 500),
		deleteTable: _.debounce(async function() {
			var _this = this;
			await _this
				.$confirm(_this.$t('ansDelete'), _this.$t('tableList.delete'), {
					confirmButtonText: _this.$t('confirm'),
					cancelButtonText: _this.$t('cancel')
				})
				.then(async () => {
					_this.loading = true;
					try {
						var response = await _this.$store.dispatch(`tableList/deleteTables`, {
							ids: _this.ids
						});
						_this.$notify({
							message: _this.$t('deleteSuccess'),
							type: 'success'
						});
					} catch (error) {
						console.log(error);
						_this.$notify.error({
							message: _this.$t('deleteWrong')
						});
					}
					_this.ids = [];
					_this.isCheckAll = false;
				})
				.catch(() => {});
		}, 500),
	}
};
</script>
