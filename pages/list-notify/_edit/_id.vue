<template>
  <div>
    <titleBar :langTitle="$route.params.id != 'create' ? $t('listNotify.update') : $t('listNotify.create')" />
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id != 'create' ? $t('listNotify.update') : $t('listNotify.create')}}</h5>
        <div class="heading-elements">
          <button :disabled="loading" @click="redirectTo('/list-notify')" class="btn btn-default mr-1">
            {{$t('back')}}
          </button>
          <button :disabled="loading" @click="validateBeforeSubmit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <!-- Bordered panel body table -->
      <div class="content">
        <div class="panel panel-flat">
          <div class="panel-body form-horizontal">
            <fieldset class="content-group col-md-7">
              <div class="form-group">
                <label class="control-label col-md-12">{{$t('listNotify.startDate')}}</label>
                <div class="col-md-12">
                  <el-date-picker v-model="formData.startDate" style="width:100%" type="datetime" :placeholder="$t('listNotify.startDate')">
                  </el-date-picker>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-12">{{$t('listNotify.endDate')}}</label>
                <div class="col-md-12">
                  <el-date-picker v-model="formData.endDate" style="width:100%" type="datetime" :placeholder="$t('listNotify.endDate')">
                  </el-date-picker>
                </div>
              </div>
              <div :class="`form-group`">
                <label class="control-label col-md-12">{{$t('listNotify.status')}} </label>
                <div class="col-md-12">
                  <el-select v-model="formData.status"
                              filterable remote
                              name="status"
                              :placeholder="$t('choose')"
                              style="width:100%">
                    <el-option v-for="item in commonData.dishStatus" :key="item" :label="$t(item)" :value="item">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div :class="`form-group  ${errors.has('title') ? 'has-error' : ''}`">
                <label class="control-label col-md-12">{{$t('listNotify.titleSend')}} *</label>
                <div class="col-md-12">
                  <el-input type="text"  v-validate="'required'" name="title" :placeholder="$t('listNotify.titleSend')"  v-model="formData.title"></el-input>
                </div>
              </div>
              <div :class="`form-group  ${errors.has('content') ? 'has-error' : ''}`">
                <label class="control-label col-md-12">{{$t('listNotify.content')}} *</label>
                <div class="col-md-12">
                  <el-input type="textarea" :rows="4"  v-validate="'required'" name="content" :placeholder="$t('listNotify.content')"  v-model="formData.content"></el-input>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-12">{{$t('listNotify.notifyBefore')}}</label>
                <div class="col-md-12">
                  <el-input type="number" name="notifyBefore" :placeholder="$t('listNotify.notifyBefore')"  v-model="formData.notifyBefore"><template slot="append">ngày</template></el-input>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-12">{{$t('listNotify.address')}}</label>
                <div class="col-md-12">
                  <address-custom @nameAddress="getAddress" :address="formData.address"></address-custom>
                </div>
              </div>
            </fieldset>
            <fieldset class="content-group col-md-5 pl-3">
              <label class="control-label col-md-12">{{$t('listNotify.sendTo')}}</label>
              <div class="col-md-12" style="margin-left: 20px; font-size: 13px;">
                <el-radio style="font-size: 13px;" v-model="formData.forAllUser" :label="true">{{$t('listNotify.allUser')}}</el-radio>
              </div>
              <div class="col-md-12" style="margin-left: 20px; font-size: 13px;">
                <el-radio style="font-size: 13px;" v-model="formData.forAllUser" :label="false">{{$t('listNotify.custom')}}</el-radio>
              </div>
              <div class="col-md-12" style="margin-left: 20px; font-size: 13px;" v-show="!formData.forAllUser">
                <el-dropdown placement="left" size="medium" trigger="click">
                  <span class="el-dropdown-link">
                    <button type="button" class="btn border-slate btn-flat">{{$t('listNotify.addUser')}}</button>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="">
                    <div class="form-group has-feedback">
                      <input type="text" v-model="searchKey" v-on:input="getUsers" class="form-control" style="width: 94%;margin-left: 8px;margin-top: 10px;" :placeholder="$t('press')">
                      <div class="form-control-feedback">
                        <i class="icon-search4 text-size-base"></i>
                      </div>
                    </div>
                    <div style="height: auto; width: auto; overflow-y: auto;">
                      <el-checkbox-group v-model="formData.sendTo">
                        <el-checkbox style="width:90% ;display:block;margin-left:10px" v-for="item in userData.data" :label="item.id" :key="item.id">{{item.fullName + ' | ' + item.email}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="col-xs-12 mb-10" style="margin-left: 20px;" v-show="!formData.forAllUser">
                <el-tag v-for="(tag,i) in listUsers" :key="i" :disable-transitions="false" type="info" class="mt-10 col-md-12" v-show="formData.sendTo.indexOf(tag.id) > -1" style="font-size: 13px; line-height: 20px;">
                  <span style="font-weight: bold">{{tag.fullName + ' | ' + tag.email}}</span>
                </el-tag>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="text-right">
          <button :disabled="loading" @click="redirectTo('/list-notify')" class="btn btn-default mr-1">
            {{$t('back')}}
          </button>
          <button :disabled="loading" @click="validateBeforeSubmit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import titleBar from '~/components/TitleBar.vue'
import commonData from '~/utils/common-data'
import moment from 'moment';
import Address from '~/components/Address.vue'
import Vue from 'vue';
export default {
  middleware: 'authenticated',
  components: {
    titleBar,
    'address-custom': Address
  },
  data() {
    return {
      loading: false,
      searchKey: '',
      commonData
    };
  },
  computed: {
    ...mapGetters({
      userData: 'editListNotify/getUsers'
    }),
    ...mapState({
      listUsers: state => state.editListNotify.listUsers,
      searchUser: state => state.editListNotify.searchUser,
    })
  },
  watch:{
  },
  async asyncData({ route, store, req }) {
    var formData = {
      status: 'active',
      startDate: moment().toISOString(),
      endDate: moment().add(1, 'days').endOf('day').toISOString(),
      sendTo: [],
      forAllUser: true,
      notifyBefore: 1
    };
    if (route.params.id != 'create') {
      formData = await store.dispatch('editListNotify/getNotify', route.params.id);
      if (!formData.sendTo) {
        formData.sendTo = [];
      }
    }
    await store.dispatch('editListNotify/getListUser');
    return { formData };
  },
  methods: {
    getAddress: function (val) {
      this.formData.address = val;
    },
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    getUsers: _.debounce(async function() {
			var _this = this;
			_this.searchUser.description = _this.searchKey;
		}, 200),
    validateBeforeSubmit: async function () {
      var _this = this;
      _this.loading = true;
      await _this.$validator.validateAll().then(async result => {
        if (result) {
          try {
            _this.$route.params.id != 'create' ? await _this.$store.dispatch('editListNotify/updateNotify', _this.formData)
                                               : await _this.$store.dispatch('editListNotify/createNotify', _this.formData);
            _this.$notify({
              message:_this.$t('saveSuccess'),
              type: 'success'
            });
            _this.redirectTo('/list-notify');
          } catch (error) {
            console.log(error);
            _this.$notify.error({
              message: _this.$t('saveWrong')
            });
          }
        }
      });
      _this.loading = false;
    },
  }
};
</script>
