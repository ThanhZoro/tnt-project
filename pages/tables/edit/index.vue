<template>
  <div>
    <titleBar :langTitle="$t('table.createList')" />
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('table.createListDes')}}</h5>
        <div class="heading-elements">
          <button :disabled="loading" @click="redirectTo('/tables')" class="btn btn-default mr-1">
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
                <legend class="text-bold">{{$t('table.general')}}</legend>
                <div :class="`form-group ${errors.has('areaId') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('table.area')}} *</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.areaId"
                               filterable remote
                               v-validate="'required'"
                               name='areaId'
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('table.seats')}}</label>
                  <div class="col-lg-10">
                    <input type="number" name="seats" :placeholder="$t('table.seats')" class="form-control" v-model="formData.seats">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('table.status')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.status"
                               filterable remote
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="item in commonData.tableStatus" :label="$t('table.' + item.value)" :key="item.value" :value="item.value">
                        <i class="icon-primitive-dot" v-bind:style="{ color: item.color}"></i> {{$t('table.' + item.value)}}
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <legend class="text-bold">{{$t('table.detail')}}</legend>
                <div :class="`form-group ${errors.has('prefixCode') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('table.prefixCode')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="prefixCode" :placeholder="$t('table.prefixCodeDes')" v-validate="{ required: true, regex: /^[a-zA-Z0-9\-\_]+$/ }" class="form-control" v-model="formData.prefixCode">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('minTable') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('table.minTable')}} *</label>
                  <div class="col-lg-10">
                    <input type="number" name="minTable" :placeholder="$t('table.minTableDes')" v-validate="'required'" class="form-control" v-model="formData.minTable">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('prefixName') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('table.prefixName')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="prefixName" :placeholder="$t('table.prefixNameDes')" v-validate="'required'" class="form-control" v-model="formData.prefixName">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('maxTable') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('table.maxTable')}} *</label>
                  <div class="col-lg-10">
                    <input type="number" name="maxTable" :placeholder="$t('table.maxTableDes')" v-validate="'required'" class="form-control" v-model="formData.maxTable">
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right">
          <button :disabled="loading" @click="redirectTo('/tables')" class="btn btn-default mr-1">
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
      var areaList = await store.dispatch('editTable/getListArea');
      var formData = { seats: 3, status: 'empty' };
      return { formData, areaList };
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
              let response = await _this.$store.dispatch('editTable/createListTable', _this.formData);
              if (!response) {
                _this.redirectTo('/tables');
                _this.$notify({
                  message:_this.$t('saveSuccess'),
                  type: 'success'
                });
              } else {
                _this.$notify.error({
                  message: _this.$t('saveWrong')
                });
              }
            } catch (error) {
              console.log(error);
              _this.$notify.error({
                message: _this.$t('saveWrong')
              });
            }
          }
        });
        _this.loading = false;
      }
    }
  };
</script>
