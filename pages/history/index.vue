<template>
  <div>
    <titleBar :langTitle="$t('history.title')" />
    <div class="content">
      <div clas="panel panel-flat">
        <div class="panel panel-body">
          <div class="col-md-6">
            <p class="blue--text" style="font-size: 20px; font-weight: bold">Bộ phận phục vụ</p>
            <ul class="list-feed">
              <li v-for="(item,i) in historyData.historyPV" :key="'history' + i">
                <div v-if="item.status == 'receiveTable' || item.status == 'createBill'" >
                  <span class="size-14 display-block break-word blue--text" style="font-weight: bold">{{$t('history.' + item.status)}}</span>
                  <span class="display-block" v-if="item.data.tableCode">Mã bàn: {{item.data.tableCode}}</span>
                </div>
                <div v-if="item.status == 'serveForCustomer'" >
                  <span class="size-14 display-block break-word blue--text" style="font-weight: bold">{{$t('history.' + item.status)}}</span>
                  <span class="display-block" v-if="item.data.nameDish">Món: {{item.data.nameDish}}</span>
                  <span class="display-block" v-if="item.data.quantity && item.data.tableCode">Số lượng: {{item.data.quantity}} - Mã bàn: {{item.data.tableCode}}</span>
                </div>
                <div v-if="item.status == 'sendDish'" >
                  <span class="size-14 display-block break-word blue--text" style="font-weight: bold">{{$t('history.' + item.status, [item.data.quantityDish])}}</span>
                  <span class="display-block" v-if="item.data.tableCode">Mã bàn: {{item.data.tableCode}}</span>
                </div>
                <div class="text-muted">{{item.nameUser}} - {{item.fromNowCreate}} </div>
              </li>
            </ul>
            <el-pagination @size-change="handleSizeChangePV"
                          @current-change="handleCurrentChangePV"
                          background
                          :current-page.sync="searchRequestPV.currentPage"
                          :page-sizes="[5, 10, 20, 50]"
                          :page-size="searchRequestPV.pageSize"
                          layout="sizes, prev, pager, next , jumper"
                          :total="historyData.totalPV">
            </el-pagination>
          </div>
          <div class="col-md-6">
            <p class="blue--text" style="font-size: 20px; font-weight: bold">Bộ phận pha chế</p>
            <ul class="list-feed">
              <li v-for="(item,i) in historyData.historyPC" :key="'history' + i">
                <div class="size-14 break-word blue--text" style="font-weight: bold">
                  <span v-if="item.status">{{$t('history.' + item.status)}}</span>:
                  <span v-if="item.data.nameDish">Món: {{item.data.nameDish}}</span>
                </div>
                <div class="size-14 break-word" >
                  <span v-if="item.data.quantity">Số lượng: {{item.data.quantity}}</span> -
                  <span v-if="item.data.tableCode">Mã bàn: {{item.data.tableCode}}</span>
                </div>
                <div class="text-muted">{{item.nameUser}} - {{item.fromNowCreate}} </div>
              </li>
            </ul>
            <el-pagination @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          background
                          :current-page.sync="searchRequestPC.currentPage"
                          :page-sizes="[5, 10, 20, 50]"
                          :page-size="searchRequestPC.pageSize"
                          layout="sizes, prev, pager, next , jumper"
                          :total="historyData.totalPC">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import titleBar from '~/components/TitleBar.vue';
import _ from 'lodash';
import firebase from 'firebase';
export default {
  middleware: 'authenticated',
  components: {
		titleBar
  },
	computed: {
    ...mapGetters({
			historyData: 'history/getHistory'
		}),
		...mapState({
			searchRequestPV: state => state.history.searchRequestPV,
			searchRequestPC: state => state.history.searchRequestPC
		})
  },
  async fetch({ store, nuxtState, route, redirect }) {
		if (!nuxtState || !nuxtState.state.roleCurrentUser || nuxtState.state.roleCurrentUser != 'admin') {
		  redirect('/auth/signin');
    } else {
      await store.dispatch('history/getListUser');
      await firebase.database().ref('/history/').on('value', function(data) {
        var historyData = {data: [], total: 0};
        const obj = data.val();
        for (let key in obj) {
          historyData.total++;
          historyData.data.push({
            id: key,
            status: obj[key].status ? obj[key].status : '',
            type: obj[key].type ? obj[key].type : '',
            data: obj[key].data ? obj[key].data : {},
            createdAt: obj[key].createdAt ? obj[key].createdAt : '',
            createdBy: obj[key].createdBy ? obj[key].createdBy : ''
          })
        }
        store.dispatch('history/setHistory', historyData);
      });
    }
  },
  methods: {
    handleSizeChange: _.debounce(async function(val) {
			var _this = this;
		}, 500),
		handleCurrentChange: _.debounce(async function(val) {
			var _this = this;
		}, 500),
    handleSizeChangePV: _.debounce(async function(val) {
      var _this = this;
      _this.searchRequestPV.pageSize = val;
		}, 500),
		handleCurrentChangePV: _.debounce(async function(val) {
      var _this = this;
      _this.searchRequestPV.currentPage = val;
		}, 500),
  }
};
</script>
