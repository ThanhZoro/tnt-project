<template>
  <div>
    <titleBar :langTitle="$nuxt.$route.params.id ? $t('editUsers.updateUser') : $t('editUsers.createUser')" />
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$nuxt.$route.params.id ? $t('editUsers.updateUser') : $t('editUsers.createUser')}}</h5>
        <div class="heading-elements">
          <button :disabled="loading" @click="redirectTo('/users')" class="btn btn-default mr-1">
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
              <fieldset class="content-group">
                <div :class="`form-group ${errors.has('email') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.userName')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="email" :disabled="$route.params.id" :placeholder="$t('userList.email')" v-validate="'required|email'" class="form-control" v-model="formData.email">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('password') ? 'has-error' : ''}`" v-if="!$route.params.id">
                  <label class="control-label col-lg-2">{{$t('userList.password')}} *</label>
                  <div class="col-lg-10">
                    <input type="password" name="password" :placeholder="$t('userList.password')" v-validate="'required'" class="form-control" v-model="formData.password">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.fullName')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="fullName" :placeholder="$t('userList.fullName')" class="form-control" v-model="formData.fullName">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('userList.phone')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="phoneNumber" :placeholder="$t('userList.phone')" class="form-control" v-model="formData.phoneNumber">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('roleUser') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('userList.roleUser')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.roleUser"
                               filterable remote
                               v-validate="'required'"
                               name="roleUser"
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="item in commonData.roleList" :key="item" :label="$t(item)" :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right">
          <button :disabled="loading" @click="redirectTo('/users')" class="btn btn-default mr-1">
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
      })
    },
    watch:{
    },
    async asyncData({ route, store, req }) {
      var formData = {};
      if (route.params.id) {
        formData = await store.dispatch('editUser/getUser',route.params.id);
      }
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
