<template>
  <div>
    <titleBar :langTitle="$t('setting.title')" />
    <div class="content">
      <navBarSetting />
      <div class="panel col-lg-9">
        <div class="panel-heading customPanelHeading">
          <h5 class="panel-title">{{$t("setting.general")}}</h5>
          <p class="content-group-lg">{{$t("setting.generalDes")}}</p>
        </div>
        <div class="panel body panel-no-border">
          <div class="panel-body">

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
import commonData from '~/utils/common-data';
export default {
	components: {
		titleBar,
		navBarSetting
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
		}),
		...mapState({
		})
  },
  watch: {
  },
	async fetch({ store, route }) {
  },
	created() {
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
