<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6 col-xs-6" style="text-align: left; padding: 0px 0px 0px 20px;margin-bottom: 10px; margin-top: 20px">
        <div @click="redirectTo('/')" class="button-back btn pointer">Trở về</div>
      </div>
      <div class="col-md-6 col-xs-6" style="text-align: right;  margin-top: 20px; padding: 0px 20px 0px 0px">
        <span style="font-size: 16px; font-weight: bold">Tổng cộng: {{listNewOrderData.total}} món</span>
      </div>
      <div class="col-md-12 col-xs-12" style="padding: 20px">
        <el-tag :disable-transitions="false" class="col-md-12 col-xs-12" v-for="(item) in listNewOrderData.data" :key="item.code" style="margin-bottom: 30px ">
          <div class="col-md-2 col-xs-3" style="padding: 5px; height: 170px">
            <img class="img-responsive" v-if="item.pictureUrlDish" :src="item.pictureUrlDish" style="width:100% ;height:100%"/>
            <img src="~/assets/images/no-image.svg" v-else style="width:100% ;height:100%"/>
          </div>
          <div class="col-md-8 col-xs-7" style="text-align: left">
            <div style="font-size: 25px; color: #e24b00; font-weight: bold; margin-top: 10px;">
              {{item.nameDish}}
            </div>
            <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
              <span class="text-lv-2">{{$t('dish.quantity')}}: </span>
              <span style="font-size: 25px; color: red">{{item.quantity}} </span>
            </div>
            <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
              <span class="text-lv-2">Yêu cầu lúc: </span>
              <span>{{item.createdAtTime}} </span><span class="text-lv-2"> (~ {{item.fromNowCreate}} )</span>
            </div>
          </div>
          <div class="col-md-2 col-xs-2" style="text-align: center;">
            <i @click="cookDone(item)" class="icon-arrow-right15 pointer" style="font-size: 110px; top: 30px;"></i>
          </div>
        </el-tag>
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
		};
	},
	watch: {
	},
	computed: {
		...mapGetters({
      listNewOrderData: 'listNewOrder/getListNewOrder'
		}),
		...mapState({
			searchRequest: state => state.listNewOrder.searchRequest
		})
	},
	async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'nvpc') {
		  redirect('/auth/signin');
		} else {
      await firebase.database().ref('/soNew/').on('value', function(data) {
        var dataList = {data: [], total: 0};
        const obj = data.val();
        for (let key in obj) {
          dataList.total++;
          dataList.data.push({
            code: key,
            tableCode: obj[key].tableCode,
            status: obj[key].status,
            nameDish: obj[key].nameDish,
            quantity: obj[key].quantity,
            pictureUrlDish: obj[key].pictureUrlDish,
            createdAt: obj[key].createdAt ? obj[key].createdAt : '',
            createdBy: obj[key].createdBy ? obj[key].createdBy : ''
          })
        }
        store.dispatch('listNewOrder/setListSO', dataList);
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
    },
    cookDone: _.debounce(async function(item) {
      try {
        await this.$store.dispatch('listNewOrder/cookDone', item);
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
    }, 500),
	}
};
</script>
