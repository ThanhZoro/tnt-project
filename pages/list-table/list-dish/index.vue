<template>
  <div class="col-md-12">
    <div class="row">
      <div class="form-group has-feedback">
        <input class="form-control" style="height: 50px" v-model="description" @focus="clear" v-on:keyup.enter="search()" :placeholder="'Nhập mã món, tên món'">
        <div class="form-control-feedback" style="margin-top: 7px">
          <i class="icon-search4"></i>
        </div>
      </div>
      <div class="col-md-12 col-xs-12" style="text-align: left; padding: 0px 0px 0px 20px">
        <div :disabled="loading" @click="redirectTo('/list-table/detail/' + currentSO.tableCode)" class="button-back btn pointer">Trở về</div>
      </div>
      <div class="col-md-2 col-xs-5" style="padding: 20px;" @click="chooseAllDish">
        <div :class="`area-in-list pointer ${searchRequest.description == '' ? 'active-area' : ''}`">
          <span>{{$t('all')}}</span>
        </div>
      </div>
      <div class="col-md-2 col-xs-5" style="padding: 20px;" v-for="itemCategory in categoryData.data" :key="itemCategory.id" @click="chooseDish(itemCategory.id)">
        <div :class="`area-in-list pointer ${searchRequest.description == itemCategory.id ? 'active-area' : ''}`">
          <span>{{itemCategory.name}}</span>
        </div>
      </div>
      <div class="col-md-12 col-xs-12">
        <hr>
      </div>
      <div class="col-md-6 col-xs-12" style="padding: 0px" v-for="itemDish in listDish.data" :key="itemDish.code">
        <div class="dish-in-order" style="margin: 10px">
          <div class="col-md-4 col-xs-4" style="padding: 5px; height: 170px">
            <img class="img-responsive" v-if="itemDish.pictureUrl" :src="itemDish.pictureUrl" style="width:100% ;height:100%"/>
            <img src="~/assets/images/no-image.svg" v-else style="width:100% ;height:100%"/>
          </div>
          <div class="col-md-6 col-xs-6" style="text-align: left">
            <div style="font-size: 19px; color: #e24b00; font-weight: bold; margin-top: 5px;">
              {{itemDish.name}}
            </div>
            <div style="font-size: 18px; font-weight: bold; margin-top: 5px;">
              <span class="text-lv-2">{{$t('dish.price')}}: </span>{{itemDish.price | currency}} / {{itemDish.unit}}
            </div>
            <div :class="`${errors.has('quantity' + itemDish.code) ? 'has-error' : ''}`" style="font-size: 18px; font-weight: bold; margin-top: 5px;">
              <span class="text-lv-2">{{$t('dish.quantity')}}: </span>
              <input type="number" :name="'quantity' + itemDish.code" v-validate="'min_value:0'" class="form-control" style="width: 50px; display: inline;" @change="handleChangeQuantity(itemDish)" v-model="itemDish.quantity">
            </div>
          </div>
          <div class="col-md-2 col-xs-2" style="text-align: center; height: 100%; border-left: 1px #70886c dashed; padding: 0px">
            <div style="height: 50%; border-bottom: 1px #70886c dashed; padding-top: 22px">
              <span><i class="icon-plus3 pointer" style="font-size: 40px; color: #0000da;" @click="addNewDish(itemDish)"></i></span>
            </div>
            <div style="height: 50%; padding-top: 22px">
              <span><i class="icon-minus3 pointer" style="font-size: 40px; color: #cc0000;" @click="minusDish(itemDish)"></i></span>
            </div>
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
export default {
	components: {
	},
	middleware: 'authenticated',
	data() {
		return {
      loading: false,
			description: '',
			isCheckAll: false,
      ids: [],
      formData: []
		};
	},
	watch: {
    "description": _.debounce(function(val) {
			this.searchRequest.description = val;
		}, 100),
	},
	computed: {
		...mapGetters({
      listDish: 'detailTableOrder/getListDish',
      categoryData: 'detailTableOrder/getCategory'
		}),
		...mapState({
      searchRequest: state => state.detailTableOrder.searchRequest,
      currentSO: state => state.detailTableOrder.currentSO4Dish
		})
	},
	async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'nvpv') {
		  redirect('/auth/signin');
		} else {
      await store.dispatch('detailTableOrder/getListCategory');
    }
  },
  created() {
    _.forEach(this.listDish.data, (o) => {
      this.formData[o.code] = o;
    })
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
    chooseDish: _.debounce(async function(value) {
			var _this = this;
      _this.searchRequest.description = value;
    }, 200),
    chooseAllDish: _.debounce(async function() {
			var _this = this;
      _this.searchRequest.description = '';
    }, 200),
    clear(){
      this.description = '';
    },
    addNewDish: async function(itemDish) {
      await this.$store.dispatch('detailTableOrder/addNewDish', itemDish);
    },
    minusDish: async function(itemDish) {
      await this.$store.dispatch('detailTableOrder/minusDish', itemDish);
    },
    handleChangeQuantity: async function(itemDish) {
      await this.$store.dispatch('detailTableOrder/changeQuantityDish', itemDish);
    }
	}
};
</script>
