<template>
  <div>
    <titleBar :langTitle="$t('setting.title')" />
    <div class="content">
      <navBarSetting />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("setting.area")}}</h5>
          <p class="content-group-lg">{{$t("setting.areaDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <div class="col-md-4" style="padding-left: 0px !important">
              <div class="form-group has-feedback">
                <input class="form-control" v-model="description" v-on:keyup.enter="search()" :placeholder="$t('setting.areaSearchDes')">
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
            <div class="col-md-4 pull-right" style="padding-right: 0px !important; text-align: right">
              <button @click="clearData" class="btn btn-default ml-1 mr-1">{{$t('clear')}}</button>
              <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}}</button>
            </div>
            <div class="pt-20">
              <fieldset class="content-group" style="margin-top:40px">
                <div class="row">
                  <div class="col-xs-4">
                    <input type="text" v-if="!formData.dataKey" name="areaId" :data-vv-as="$t('setting.areaId')" :placeholder="$t('setting.areaId')" v-validate="{ required: true, regex: /^[a-zA-Z0-9\-\_]+$/ }" class="form-control" v-model="formData.id">
                    <input type="text" :disabled="formData.dataKey" v-else name="areaId" :data-vv-as="$t('setting.areaId')" :placeholder="$t('setting.areaId')" class="form-control" v-model="formData.id">
                    <span v-show="errors.has('areaId')" class="help-block text-danger">{{$t('setting.errorCategory')}}</span>
                  </div>
                  <div class="col-xs-8">
                    <input type="text" name="areaName" :data-vv-as="$t('setting.areaName')" :placeholder="$t('setting.areaName')" v-validate="'required'" class="form-control" v-model="formData.name">
                    <span v-show="errors.has('areaName')" class="help-block text-danger">{{$t('setting.errorCategory')}}</span>
                  </div>
                </div>
              </fieldset>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>{{$t('setting.areaId')}}</th>
                      <th>{{$t('setting.areaName')}}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in areaData.data" :key="i" :value="item">
                      <td>{{item.id}}</td>
                      <td>{{item.name}}</td>
                      <td>
                        <div :title="$t('setting.updateArea')" class="display-inline pointer">
                          <div @click="editData(item)">
                            <i class="icon-pencil7"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <el-pagination
                class="ml-4"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page.sync="searchArea.currentPage"
                :page-sizes="[10, 20, 50]"
                :page-size="searchArea.pageSize"
                layout="sizes, prev, pager, next , jumper"
                :total="areaData.total">
            </el-pagination>
            <div class="total-list">
              <div v-if="!areaData.total">{{$t('noData')}}</div>
              <div v-else>{{$t('have')}} {{areaData.total}} {{$t('row')}}</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import titleBar from '~/components/TitleBar.vue';
import navBarSetting from '~/components/NavBarSetting.vue';
import masterData from '~/components/MasterData.vue';
import commonData from '~/utils/common-data';
import firebase from 'firebase';
export default {
	components: {
		titleBar,
		navBarSetting,
		masterData
  },
  middleware: 'authenticated',
	data() {
		return {
			commonData,
			formData: { },
      loading: false,
      description: ''
		};
	},
	computed: {
		...mapGetters({
			areaData: 'setting/getArea'
		}),
		...mapState({
      searchArea: state => state.setting.searchArea
		})
  },
  watch: {
  },
	async fetch({ store, redirect, nuxtState }) {
    if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'admin') {
		  redirect('/auth/signin');
		} else {
      await firebase.database().ref('/area/').on('value', function(data) {
        var area = {data: [], total: 0};
        const obj = data.val();
        for (let key in obj) {
          area.total++;
          area.data.push({
            id: key,
            dataKey: key,
            name: obj[key].name
          })
        }
        store.dispatch('setting/setArea', area);
      });
    }
  },
	created() {
		var _this = this;
	},
	methods: {
    handleSizeChange : _.debounce( async function(val) {
      var _this = this;
      _this.searchArea.pageSize = val;
		},500 ),
		handleCurrentChange: _.debounce(async function (val) {
      var _this = this;
      _this.searchArea.currentPage = val;
		},500),
		search: _.debounce(async function() {
			var _this = this;
			_this.searchArea.description = _this.description;
		}, 500),
		validateBeforeSubmit: _.debounce(async function() {
			var _this = this;
			await _this.$validator.validateAll().then(async result => {
				if (result) {
					try {
						var response = await _this.$store.dispatch('setting/editArea', _this.formData);
						_this.$notify({
							message: _this.$t('saveSuccess'),
							type: 'success'
            });
            _this.clearData();
					} catch (error) {
						_this.$notify({
							message: _this.$t('saveWrong')
						});
					}
				}
			});
		}, 500),
		clearData: function() {
			var _this = this;
			_this.formData = {};
    },
    editData: function(item) {
			var _this = this;
			_this.formData = _.cloneDeep(item);
		},
	}
};
</script>
