<template>
  <div>
    <titleBar :langTitle="$route.params.id ? $t('listMessages.update') : $t('listMessages.create')" />
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$route.params.id ? $t('listMessages.update') : $t('listMessages.create')}}</h5>
        <div class="heading-elements">
          <button :disabled="loading" @click="redirectTo('/list-messages')" class="btn btn-default mr-1">
            {{$t('back')}}
          </button>
          <button :disabled="loading" @click="validateBeforeSubmit" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <!-- Bordered panel body table -->
      <div class="content">
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <!-- <fieldset class="content-group">
                <div :class="`form-group ${errors.has('sendTo') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('listMessages.sendTo')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.sendTo"
                               filterable remote
                               v-validate="'required'"
                               name="sendTo"
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="item in listUsers" :key="item.id" :label="item.fullName | item.email" :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('listMessages.content')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="content" :placeholder="$t('listMessages.content')" class="form-control" v-model="formData.content">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('listMessages.startDate')}}</label>
                  <div class="col-lg-10">
                    <el-date-picker v-model="formData.startDate" style="width:100%" type="date" :placeholder="$t('listMessages.startDate')">
                    </el-date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('listMessages.endDate')}}</label>
                  <div class="col-lg-10">
                    <el-date-picker v-model="formData.endDate" style="width:100%" type="date" :placeholder="$t('listMessages.endDate')">
                    </el-date-picker>
                  </div>
                </div>
                <div :class="`form-group`">
                  <label class="control-label col-lg-2">{{$t('listMessages.status')}} </label>
                  <div class="col-lg-10">
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
              </fieldset> -->
            </div>
          </div>
        </div>
        <div class="text-right">
          <button :disabled="loading" @click="redirectTo('/list-messages')" class="btn btn-default mr-1">
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
import Vue from 'vue';
export default {
  middleware: 'authenticated',
  components: {
    titleBar,
  },
  data() {
    return {
      loading: false,
      commonData
    };
  },
  computed: {
    ...mapGetters({
    }),
    ...mapState({
      //listUsers: state => state.editListMessages.listUsers
    })
  },
  watch:{
  },
  async asyncData({ route, store, req }) {
    var formData = {};
    // await store.dispatch('editListMessages/getListUser');
    if (route.params.id) {
      //formData = await store.dispatch('editUser/getUser',route.params.id);
    }
    console.log(route)
    return { formData };
  },
  methods: {
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    validateBeforeSubmit: async function () {
      var _this = this;
      _this.loading = true;
      await _this.$validator.validateAll().then(async result => {
        if (result) {
          try {
            let response = _this.$route.params.id ? await _this.$store.dispatch('editUser/updateUser', _this.formData) : await _this.$store.dispatch('editUser/createUser', _this.formData);
            _this.redirectTo('/users');
            _this.$notify({
              message:_this.$t('saveSuccess'),
              type: 'success'
            });
          } catch (error) {
            console.log(error);
            _this.$notify({
              message: _this.$t('editUsers.saveUserWrong')
            });
          }
        }
      });
      _this.loading = false;
    },
  }
};
</script>
