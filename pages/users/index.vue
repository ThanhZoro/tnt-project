<template>
  <div>
    <titleBar :langTitle="$t('userList.users')" />
    <div class="content">
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('userList.users')}}</h5>
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
                  <el-dropdown-item :key="index" :command="{props: props, item: item}">{{$t('userList'+'.'+props) }}
                    <i v-show="item" class="el-icon-check mt-10 ml-20" style="float:right;"></i>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <button class="btn btn-primary" @click="redirectTo('/users/edit')">
              {{$t('createNew')}}
            </button>
          </div>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input class="form-control" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('userList.searchDes')">
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
                  <button type="button" v-if="ids.length" size="medium" class="btn bg-slate-400 mr-5" @click="deleteUser(ids)">
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
                      <template v-if="props=='fullName'">
                        <th :key="index" v-show="item">{{$t(`userList.${props}`)}}</th>
                        <th :key="`${index}-m`"></th>
                      </template>
                      <template v-else>
                        <th :key="index" v-show="item">{{$t(`userList.${props}`)}}</th>
                      </template>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in userData.data" :key="i" :value="item">
                    <td><input type="checkbox" class="custorm-checkbox" :value="item.id" v-model="ids" /></td>
                    <td v-show="headers['fullName']" style="min-width:180px;">
                      <nuxt-link :to="`/users/edit/${item.id}`">
                        {{item.fullName ? item.fullName: $t('notAvailableFullName')}}
                      </nuxt-link>
                    </td>
                    <td style="min-width:120px">
                      <div :title="$t('editUsers.updateUser')" class="display-inline">
                        <nuxt-link :to="`/users/edit/${item.id}`">
                          <i class="icon-pencil7"></i>
                        </nuxt-link>
                      </div>
                    </td>
                    <td v-show="headers['email']" style="min-width:180px;">
                      <div><a :href="`mailto:${item.email }`" target="_top">{{item.email || $t('notAvailableEmail')}}</a></div>
                    </td>
                    <td v-show="headers['phone']" style="min-width:180px;">
                      {{item.phoneNumber ? item.phoneNumber: $t('notAvailablePhone')}}
                    </td>
                    <td v-show="headers['roleUser']" style="min-width:200px;">
                      <nuxt-link :to="`/users/accessRight/edit/${item.id}`">
                        {{item.roleUser}}
                      </nuxt-link>
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
              :total="userData.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!userData.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{userData.total}} {{$t('row')}}</div>
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
				? _.map(_this.userData.data, o => {
						return o.id;
				  })
				: [];
		}
	},
	computed: {
		...mapGetters({
			userData: 'userList/getUsers'
		}),
		...mapState({
			headers: state => state.userList.headers,
			searchRequest: state => state.userList.searchRequest
			// users: state => state.userList.users
		})
	},
	async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'admin') {
		  redirect('/auth/signin');
		} else {
      await firebase.database().ref('/users/').on('value', function(data) {
        var userData = {data: [], total: 0};
        const obj = data.val();
        for (let key in obj) {
          userData.total++;
          userData.data.push({
            id: key,
            fullName: obj[key].fullName ? obj[key].fullName : '',
            phoneNumber: obj[key].phoneNumber ? obj[key].phoneNumber : '',
            email: obj[key].email,
            roleUser: obj[key].roleUser,
            isDelete: obj[key].isDelete,
            createdAt: obj[key].createdAt ? obj[key].createdAt : '',
            updatedAt: obj[key].updatedAt ? obj[key].updatedAt : ''
          })
        }
        store.dispatch('userList/setUsers', userData);
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
			await _this.$store.dispatch('userList/showHideCols', command);
		},
		search: _.debounce(async function() {
			var _this = this;
			_this.searchRequest.description = _this.description;
		}, 500),
		deleteUser: _.debounce(async function() {
			var _this = this;
			await _this
				.$confirm(_this.$t('ansDelete'), _this.$t('userList.delete'), {
					confirmButtonText: _this.$t('confirm'),
					cancelButtonText: _this.$t('cancel')
				})
				.then(async () => {
					_this.loading = true;
					try {
						var response = await _this.$store.dispatch(`userList/deleteUsers`, {
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
