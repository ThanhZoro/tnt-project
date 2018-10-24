<template>
  <!-- Bordered panel body table -->
  <fieldset class="content-group">
    <fieldset class="content-group">
      <div class="form-group">
        <div class="col-md-12">
          <div class="col-xs-2">
            <input type="text"  v-if="!formData.id" name="dataKey" :data-vv-as="$t('key')" :placeholder="$t('key')" v-validate="{ required: true, regex: /^[a-zA-Z0-9\-\_]+$/ }" class="form-control" v-model="formData.dataKey">
            <input type="text" v-else  name="dataKey" :data-vv-as="$t('key')" :placeholder="$t('key')"  class="form-control" v-model="formData.dataKey">
            <span v-show="errors.has('dataKey')" class="help-block text-danger">{{ errors.first('dataKey') }}</span>
          </div>
          <div class="col-xs-2">
            <input type="text" name="dataValue"  :data-vv-as="$t('value')" :placeholder="$t('value')" v-validate="'required'" class="form-control" v-model="formData.dataValue">
            <span v-show="errors.has('dataValue')" class="help-block text-danger">{{ errors.first('dataValue') }}</span>
          </div>
          <div class="col-xs-2">
            <input type="color" class="form-control"  :placeholder="$t('color')" v-model="formData.color">
            </div>
            <div class="col-xs-2">
              <input type="number" class="form-control"  :placeholder="$t('weight')" v-model="formData.weight">
            </div>

              <div class="col-xs-2 text-right">
              </div>
            </div>
          </div>
    </fieldset>
    <div class="table-responsive" v-if="commonDatas && commonDatas.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th>{{$t('key')}}</th>
            <th>{{$t('value')}}</th>
            <th>{{$t('weight')}}</th>
            <th>{{$t('color')}}</th>
            <th>{{$t('action')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in commonDatas" :key="i" :value="item">
            <td>{{item.dataKey}}</td>
            <td>{{item.dataValue}}</td>
            <td>{{item.weight}}</td>
            <td><span v-bind:style="{backgroundColor: item.color, padding: '3px 10px', border: '1px solid #ccc', width:'50px;'}"></span></td>
            <td>
              <div class="tooltip-css">
                <div class="icons-list">
                  <a @click="editData(item)" class="mr-15"><i class="icon-pencil7"></i></a>
                </div>
                <span class="tooltiptext" style="margin-left: -65px;">{{$t('updateInfo')}}</span>
              </div>
              <div class="tooltip-css">
                <div class="icons-list">
                  <a @click="deleteData(item.id)"><i class="icon-trash"></i></a>
                </div>
                <span class="tooltiptext" style="margin-left: -50px;">{{$t('deleteInfo')}}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </fieldset>
  <!-- /bordered panel body table -->
</template>
<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import commonData from '~/utils/common-data';
export default {
	props: {
		dataType: {
			type: String
		},
		haveColor: {
			type: Boolean
		},
		commonDatas: {
			type: Array
		}
	},
	data() {
		return {
			formData: { color: '#000000' },
			loading: false,
			commonData
		};
	},
	watch: {
		'$route.params.id': function(val) {
			this.formData = { color: '#000000' };
		}
	},
	computed: {},
	async created() {
		var _this = this;
	},
	methods: {
		validateBeforeSubmit: _.debounce(async function() {
			var _this = this;
			_this.loading = true;
			await _this.$validator.validateAll().then(async result => {
				if (result) {
					_this.formData.dataType = _this.dataType;
					_this.$emit('validateBeforeSubmit', _this.formData);
					_this.clearData();
				}
			});
			_this.loading = false;
		}, 500),
		deleteData: function(key) {
			var _this = this;
			_this.$emit('deleteData', key);
		},
		editData: function(item) {
			var _this = this;
			_this.formData = _.cloneDeep(item);
		},
		clearData: function() {
			var _this = this;
			_this.formData = { color: '#000000' };
		}
	}
};
</script>
