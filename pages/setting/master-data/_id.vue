<template>
  <div>
    <titleBar :langTitle="$t('screen.setting')" />
    <div class="content">
      <navBarSetting />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("settings.masterData")}}</h5>
          <p class="content-group-lg">{{$t("settings.Desother")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">
            <div class="pull-right">
              <el-dropdown placement="bottom" size="medium" trigger="click">
                <span class="el-dropdown-link">
                  <button size="medium" class="btn btn-default">
                    {{$t('filter')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </button>
                </span>
                <el-dropdown-menu slot="dropdown" class="dropdown-filter">
                  <el-checkbox :indeterminate="filter.isIndeterminate" v-model="filter.checkAll" @change="handleCheckAllChange">{{$t('all')}}</el-checkbox>
                  <el-checkbox-group v-model="filter.checkList" @change="handleCheckedFilterChange">
                    <el-checkbox style="width:100% ;display:block;margin-left:0px" v-for="item in commonData.masterData" :label="item" :key="item">{{$t(`dataTypeText.`+item)}}</el-checkbox>
                  </el-checkbox-group>
                </el-dropdown-menu>
              </el-dropdown>
              <button @click="clearData" class="btn btn-default ml-1 mr-1">{{$t('clear')}}</button>
              <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}}</button>
            </div>
            <div class="pt-20">
              <fieldset class="content-group" style="margin-top:40px">
                <div class="row">
                  <div class="col-xs-2">
                    <input type="text" v-if="!formData.id" name="dataKey" :data-vv-as="$t('key')" :placeholder="$t('key')" v-validate="{ required: true, regex: /^[a-zA-Z0-9\-\_]+$/ }" class="form-control" v-model="formData.dataKey">
                    <input type="text" :disabled="formData.id" v-else name="dataKey" :data-vv-as="$t('key')" :placeholder="$t('key')" class="form-control" v-model="formData.dataKey">
                    <span v-show="errors.has('dataKey')" class="help-block text-danger">{{ errors.first('dataKey') }}</span>
                  </div>
                  <div class="col-xs-3">
                    <input type="text" name="dataValue" :data-vv-as="$t('value')" :placeholder="$t('value')" v-validate="'required'" class="form-control" v-model="formData.dataValue">
                    <span v-show="errors.has('dataValue')" class="help-block text-danger">{{ errors.first('dataValue') }}</span>
                  </div>
                  <div class="col-xs-2">
                    <input type="color" class="form-control" :placeholder="$t('color')" v-model="formData.color">
                      </div>
                    <div class="col-xs-2">
                      <input type="number" class="form-control" :placeholder="$t('weight')" v-model="formData.weight">
                      </div>
                      <div class="col-xs-3">
                        <div :class="`form-group ${errors.has('dataType') ? 'has-error' : ''}`">
                          <el-select v-model="formData.dataType" :placeholder="'Chọn loại'" v-validate="'required'" name="dataType" style="width:100%">
                            <el-option v-for="item in commonData.masterData" :key="item" :label="$t(`dataTypeText.${item}`)" :value="item">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
              </fieldset>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>{{$t('key')}}</th>
                      <th>{{$t('value')}}</th>
                      <th>{{$t('weight')}}</th>
                      <th>{{$t('color')}}</th>
                      <th>{{$t('type')}}</th>
                      <th>{{$t('action')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in getMasterData.data" :key="i" :value="item">
                      <td>{{item.dataKey}}</td>
                      <td>{{item.dataValue}}</td>
                      <td>{{item.weight}}</td>
                      <td><span v-bind:style="{backgroundColor: item.color, padding: '3px 10px', border: '1px solid #ccc', width:'50px;'}"></span></td>
                      <td>{{$t(`dataTypeText.${item.dataType}`)}}</td>
                      <td>
                        <div class="display-inline" :title="$t('updateInfo')">
                          <div class="icons-list">
                            <a @click="editData(item)" class="mr-15"><i class="icon-pencil7"></i></a>
                          </div>
                        </div>
                        <div class="display-inline" :title="$t('deleteInfo')">
                          <div class="icons-list">
                            <a @click="deleteData(item.id)"><i class="icon-trash"></i></a>
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
              :current-page.sync="searchRequest.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="searchRequest.pageSize"
              layout="sizes, prev, pager, next , jumper"
              :total="getMasterData.total">
            </el-pagination>
            <div class="total-list">
              <div v-if="!getMasterData.total">{{$t('noData')}}</div>
              <div v-else>{{$t('have')}} {{getMasterData.total}} {{$t('row')}}</div>
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
			formData: { color: '#000000', dataType: '' },
      loading: false,
      loadPage:0
		};
	},
	computed: {
		...mapGetters({
			getMasterData: 'setting/getMasterData'
		}),
		...mapState({
      filter: state => state.setting.filter,
      searchRequest: state => state.setting.searchRequest,
      advanceFilter: state => state.setting.advanceFilter
		})
  },
  watch: {
    'filter.checkList': function(val){
      var _this =this;
      if(_this.loadPage){
        _this.setCheckList(val);
      }
      _this.loadPage++
    }
  },
	async fetch({ store, route }) {
    if (store){
      if (!store.state.setting.masterData) { await store.dispatch('setting/getMasterData'); }
    } else { await store.dispatch('setting/getMasterData'); }
  },
	created() {
		var _this = this;
		_this.handleCheckAllChange(true);
	},
	methods: {
    handleSizeChange : _.debounce( async function(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("setting/getMasterData");
		},500 ),
		handleCurrentChange: _.debounce(async function (val) {
      var _this = this;
      _this.searchRequest.currentPage = val;
      await _this.$store.dispatch("setting/getMasterData");
		},500),
		handleSort: _.debounce(async function(sortDesc) {
      var _this = this;
      _this.searchRequest.sort = JSON.parse(sortDesc);
      await _this.$store.dispatch("setting/getMasterData");
		},500),
		validateBeforeSubmit: _.debounce(async function() {
			var _this = this;
			await _this.$validator.validateAll().then(async result => {
				if (result) {
					try {
						var response = _this.formData.id
							? await _this.$store.dispatch('setting/updateMasterData', _this.formData)
							: await _this.$store.dispatch('setting/createMasterData', _this.formData);
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
		deleteData: _.debounce(async function(val) {
			var _this = this;
			await _this
				.$confirm(_this.$t('awsDel', [null]), {
					confirmButtonText: _this.$t('confirm'),
					cancelButtonText: _this.$t('cancel')
				})
				.then(async () => {
					try {
						var response = await _this.$store.dispatch(
							'setting/deleteMasterData',
							{ ids: [val] }
						);
						_this.$notify({
							message: _this.$t('deleteSuccess'),
							type: 'success'
						});
					} catch (error) {
						_this.$notify({
							message: _this.$t('deleteWrong')
						});
					}
				})
				.catch(() => {});
		}, 500),
		handleCheckAllChange(val) {
			this.filter.checkList = val
				? _.cloneDeep(this.commonData.masterData)
				: [];
			this.filter.isIndeterminate = false;
		},
		handleCheckedFilterChange(value) {
			let checkedCount = value;
			this.filter.checkAll = checkedCount === this.commonData.masterData.length;
			this.filter.isIndeterminate =
				checkedCount > 0 && checkedCount < this.commonData.masterData.length;
		},
		async setCheckList(val) {
      var _this = this;
      var data = [];
      _.forEach(val,(v)=>{data.push({id: v.toLowerCase()});});
      _this.advanceFilter.choosenFilter= [{searchType: 'checkbox', data: data, field: 'dataType'}];
      await _this.$store.dispatch("setting/getMasterData");
		},
		clearData: function() {
			var _this = this;
			_this.formData = { color: '#000000' };
    },
    editData: function(item) {
			var _this = this;
			_this.formData = _.cloneDeep(item);
		},
	}
};
</script>
