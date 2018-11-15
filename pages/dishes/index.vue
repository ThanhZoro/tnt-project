<template>
  <div>
    <titleBar :langTitle="$t('dish.title')" />
    <div class="content">
      <div class="panel panel-flat">
        <div class="panel-heading">
          <h5 class="panel-title">{{$t('dish.title')}}</h5>
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
            <button class="btn btn-primary" @click="redirectTo('/dishes/edit')">
              {{$t('createNew')}}
            </button>
          </div>
        </div>
        <div class="panel-body">
          <form onsubmit="return false;">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group has-feedback">
                  <input class="form-control" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('dish.searchDes')">
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
          <div class="col-md-12 col-xs-12">
            <div class="table-cont" id="table-cont" style="padding-left: 10px; padding-right: 10px;">
              <div class="col-md-4 col-xs-12" v-for="(item, i) in dishData.data" :key="i">
                <div class="panel panel-body" style="height: 180px; overflow-y: hidden" v-bind:class="{ 'border-left-danger': item.status == 'inactive', 'border-left-success' : item.status == 'active'}">
                   <div class="row">
                    <div class="col-md-5 col-xs-5" style="padding: 0px; margin-top: 15px;">
                      <img class="img-responsive pointer" v-if="item.pictureUrl" :src="item.pictureUrl" style="width:100%; height:100%" @click="handleShowImage(item)"/>
                      <img src="~/assets/images/no-image.svg" v-else style="width:100% ;height:100%" />
                    </div>
                    <div class="col-md-7 col-xs-7">
                      <div class="col-md-12 text-right" style="padding: 0px; margin-top: -10px" >
                        <div class="display-inline icons-list" :title="$t('dish.updateDish')" >
                          <nuxt-link :to="`/dishes/edit/${item.code}`">
                            <i class="icon-pencil7"></i>
                          </nuxt-link>
                        </div>
                        <div class="display-inline icons-list"  style="margin-left:10px !important" :title="$t('dish.delete')">
                          <a @click="deleteDish(item.code)"><i class="icon-trash"></i></a>
                        </div>
                      </div>
                      <div class="media pointer col-md-12 col-xs-12" style="padding: 0px;margin-top: 7px !important; ">
                        <div class="media-body">
                          <nuxt-link :to="`/dishes/edit/${item.code}`" style="font-size: 18px; font-weight: bold; padding: 0px !important;">
                            <div>{{item.name}}</div>
                          </nuxt-link>
                        </div>
                      </div>
                      <div class="media pointer col-md-12 col-xs-12" style="padding: 0px">
                        <div class="media-body">
                          <div>{{item.price}}/{{item.unit}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination class="ml-20"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              :current-page.sync="searchRequest.currentPage"
              :page-sizes="[12, 24, 48]"
              :page-size="searchRequest.pageSize"
              layout="sizes, prev, pager, next , jumper"
              :total="dishData.total">
            </el-pagination>
          </div>
          <div class="total-list">
            <div v-if="!dishData.total">{{$t('noData')}}</div>
            <div v-else>{{$t('have')}} {{ dishData.total}} {{$t('row')}}</div>
          </div>
        </div>
        <el-dialog :title="showImage.name"
                   :visible.sync="popup.show"
                   width="50%"
                   :before-close="handleClose">
          <img class="img-responsive pointer" :src="showImage.url" style="width:100%; height:100%" />
        </el-dialog>
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
      showImage: {},
      popup: {
        show: false
      }
		};
	},
	watch: {
		isCheckAll: function(val) {
			var _this = this;
			_this.ids = val
				? _.map(_this.dishData.data, o => {
						return o.id;
				  })
				: [];
		}
	},
	computed: {
		...mapGetters({
			dishData: 'dishList/getDishes'
		}),
		...mapState({
			searchRequest: state => state.dishList.searchRequest
			// users: state => state.userList.users
		})
	},
	async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'admin') {
		  redirect('/auth/signin');
		} else {
      await firebase.database().ref('/dishes/').on('value', function(data) {
        var dishData = {data: [], total: 0};
        const obj = data.val();
        for (let key in obj) {
          dishData.total++;
          dishData.data.push({
            code: key,
            name: obj[key].name ? obj[key].name : '',
            price: obj[key].price ? obj[key].price : '',
            categoryId: obj[key].categoryId,
            unit: obj[key].unit,
            status: obj[key].status,
            pictureUrl: obj[key].pictureUrl,
            isDelete: obj[key].isDelete,
            createdAt: obj[key].createdAt ? obj[key].createdAt : '',
            updatedAt: obj[key].updatedAt ? obj[key].updatedAt : ''
          })
        }
        store.dispatch('dishList/setDishes', dishData);
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
    handleClose: function(){
      this.popup.show = false;
    },
    handleShowImage: function(item){
      this.popup.show = true;
      this.showImage.name = item.name;
      this.showImage.url = item.pictureUrl;
    },
    deleteDish: _.debounce(async function(codeDish) {
			var _this = this;
			await _this
				.$confirm(_this.$t('ansDelete'), _this.$t('dish.delete'), {
					confirmButtonText: _this.$t('confirm'),
					cancelButtonText: _this.$t('cancel')
				})
				.then(async () => {
					_this.loading = true;
					try {
						var response = await _this.$store.dispatch(`dishList/deleteDish`, codeDish);
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
