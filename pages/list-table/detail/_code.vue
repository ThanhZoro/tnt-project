<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-3 col-xs-3" style="text-align: left; margin-top: 20px; padding: 0px 0px 0px 20px">
        <div @click="backToListTable" class="button-back btn pointer">Trở về</div>
      </div>
      <div class="col-md-6 col-xs-6" style="text-align: center;">
        <h1 style="text-transform: uppercase; font-weight: bold">{{tableData.name}}</h1>
      </div>
      <div class="col-md-3 col-xs-3" style="text-align: right;  margin-top: 20px; padding: 0px 20px 0px 0px">
        <button @click="redirectTo('/list-table/list-dish')" :disabled="tableData.status != 'full' && tableData.status != 'order'" class="button-submit btn pointer">{{$t('dish.chooseDish')}}</button>
      </div>
      <div class="col-md-12 col-xs-12" style="text-align: center">
        <div style="font-size: 18px;">
          {{$t('table.status')}}: <i class="icon-primitive-dot" v-show="tableData.status" v-bind:style="{ color: tableData.status == 'empty' ? '#2dd400' : (tableData.status == 'full' ? '#ff1d1d' : (tableData.status == 'order' ? '#ffa90b' : 'black'))}"></i> {{$t('table.' + tableData.status)}}
        </div>
      </div>
      <div class="col-md-12 col-xs-12" style="text-align: center; margin-top: 20px" v-if="tableData.status == 'empty'">
        <button class="btn btn-primary" @click="receive">{{$t('table.receive')}}</button>
      </div>
      <div class="col-md-6 col-md-offset-3 col-xs-12" style="text-align: center; margin-top: 20px" v-else-if="tableData.status == 'full' || tableData.status == 'order'">
        <div class="row">
          <div class="dish-in-order" v-for="(itemDish) in currentSOData.dishList" :key="itemDish.code" v-show="itemDish.quantity > 0">
            <div class="col-md-4 col-xs-4" style="padding: 5px; height: 170px">
              <img class="img-responsive" v-if="itemDish.pictureUrl" :src="itemDish.pictureUrl" style="width:100% ;height:100%"/>
              <img src="~/assets/images/no-image.svg" v-else style="width:100% ;height:100%"/>
            </div>
            <div class="col-md-6 col-xs-6" style="text-align: left">
              <div style="font-size: 19px; color: #e24b00; font-weight: bold; margin-top: 10px;">
                {{itemDish.name}}
              </div>
              <div style="font-size: 18px; font-weight: bold; margin-top: 10px;">
                <span class="text-lv-2">{{$t('dish.price')}}: </span>{{itemDish.price | currency}} / {{itemDish.unit}}
              </div>
              <div style="font-size: 18px; font-weight: bold; margin-top: 10px;">
                <span class="text-lv-2">{{$t('dish.quantity')}}: </span>
                <span  v-if="itemDish.originalQuantity == itemDish.quantity">{{itemDish.quantity}}</span>
                <span v-else>{{itemDish.originalQuantity}} -> <span style="color: red">{{itemDish.quantity}}</span></span>
              </div>
            </div>
            <div class="col-md-2 col-xs-2"  style="height: 100%; border-left: 1px #70886c dashed; padding: 0px">
              <div style="height: 50%; border-bottom: 1px #70886c dashed; padding-top: 22px">
                <span><i class="icon-plus3 pointer" @click="addNewDish(itemDish)" style="font-size: 40px; color: #0000da;"></i></span>
              </div>
              <div style="height: 50%; padding-top: 22px">
                <span><i class="icon-minus3 pointer"  @click="minusDish(itemDish)" style="font-size: 40px; color: #cc0000;"></i></span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <button @click="sendDish" :class="{'btn btn-success': changeValue == false, 'btn btn-warning': changeValue == true}" :disabled="!changeValue || loadingBill || loadingSend"><i v-show="loadingSend" class="icon-spinner2 spinner position-left"></i>Gửi pha chế</button>
          </div>
        </div>
        <div class="row" style="margin: 0px 10px 0px 10px;">
          <legend class="text-bold" style="text-align: left; padding-bottom: 0px;"><span style="font-size: 18px; font-weight: bold; font-style: italic;">Thanh toán</span></legend>
          <div class="col-md-12 col-xs-12" v-for="(item) in currentSOData.dishList" :key="'pay' + item.code" v-show="item.quantity!=0">
            <div class="row"  style="text-align: left; border-bottom: 1px #dedede dashed; margin: 0px 0px 15px 0px">
              <div class="col-md-12 col-xs-12">
                <span style="font-size: 16px; color: #e24b00; font-weight: bold;">{{item.name}} </span>
              </div>
              <div class="col-md-8 col-xs-8">
                &nbsp;&nbsp;&nbsp;<span style="font-size: 16px; font-weight: bold">{{item.price | currency}}</span> x <span style="font-size: 16px;font-weight: bold">{{item.quantity}}</span>
              </div>
              <div class="col-md-4 col-xs-4" style="text-align: right;">
                <span style="font-size: 16px; font-weight: bold;">{{item.price*item.quantity | currency}}</span>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-xs-12">
            <div class="col-md-6 col-xs-6" style="text-align: left; margin-bottom: 10px;">
              <span style="font-size: 16px; font-weight: bold;">Thành tiền: </span>
            </div>
            <div class="col-md-6 col-xs-6" style="text-align: right; margin-bottom: 10px;">
              <span style="font-size: 16px; font-weight: bold; color: blue">{{currentSOData.total | currency}}</span>
            </div>
          </div>
          <div class="col-md-12 col-xs-12" style="text-align: right;">
            <span class="text-lv-2" style="font-size: 16px; font-weight: bold;">{{currentSOData.stringTotal}}</span>
          </div>
          <div class="col-md-12 col-xs-12" style="margin-top: 20px; margin-bottom: 50px;">
            <button @click="createBill" :disabled="loadingBill || loadingSend" class="btn btn-primary"><i v-show="loadingBill" class="icon-spinner2 spinner position-left"></i> Thanh toán</button>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-xs-12" style="text-align: center; margin-top: 20px" v-else>
        <div style="font-size: 15px">Bàn này hiện tại không được sử dụng. Vui lòng chọn bàn khác.</div>
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
      loadingSend: false,
      loadingBill: false,
			description: '',
      isCheckAll: false,
      checkNewDish: false,
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
      tableData: 'detailTableOrder/getTable',
      currentSOData: 'detailTableOrder/getCurrentSO',
      listDish: 'detailTableOrder/getListDish',
		}),
		...mapState({
			searchRequest: state => state.detailTableOrder.searchRequest,
			changeValue: state => state.detailTableOrder.changeValue
		})
  },
  async fetch({ route, store, req, redirect }) {
    if (route.params.code && store.state.detailTableOrder.trigger == false) {
      await firebase.database().ref('/tables/' + route.params.code).on('value', async function(data) {
        let table = {}
        table = data.val();
        table.code = data.key;
        await store.dispatch('detailTableOrder/setTable', table);
        if ((table.status == 'full' || table.status == 'order') && table.currentSO){
          await store.dispatch('detailTableOrder/getListDish');
          await store.dispatch('detailTableOrder/getCurrentSO', table.currentSO);
        }
      })
      store.state.detailTableOrder.trigger = true;
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
    },
    receive: _.debounce(async function() {
      var _this = this;
			await _this.$store.dispatch('detailTableOrder/createSO', _this.$route.params.code);
    }, 500),
    addNewDish: async function(itemDish) {
      await this.$store.dispatch('detailTableOrder/addNewDish', itemDish);
    },
    minusDish: async function(itemDish) {
      await this.$store.dispatch('detailTableOrder/minusDish', itemDish);
    },
    sendDish: _.debounce(async function() {
      this.loadingSend = true;
      try {
        await this.$store.dispatch('detailTableOrder/sendDish');
        this.$notify({
          message: 'Đã gửi thành công',
          type: 'success'
        });
      } catch (error) {
        console.log(error);
        this.$notify.error({
          message: 'Gửi thất bại'
        });
      }
      this.loadingSend = false;
    }, 500),
    backToListTable: function(){
      this.$store.dispatch('detailTableOrder/clearDataDetail');
      this.redirectTo('/list-table');
    },
    createBill: _.debounce(async function() {
			var _this = this;
			await _this
				.$confirm('Bạn có chắc chắn muốn tính tiền cho bàn này?', 'Tính tiền', {
					confirmButtonText: _this.$t('confirm'),
					cancelButtonText: _this.$t('cancel')
				})
				.then(async () => {
					_this.loadingBill = true;
					try {
						 await this.$store.dispatch('detailTableOrder/createBill', this.currentSOData.tableCode);
						_this.$notify({
							message: 'Đã tạo hóa đơn thành công.',
							type: 'success'
						});
					} catch (error) {
						console.log(error);
						_this.$notify.error({
							message: 'Tạo hóa đơn thất bại'
						});
					}
				})
        .catch(() => {});
        _this.loadingBill = false;
		}, 500),
	}
};
</script>
