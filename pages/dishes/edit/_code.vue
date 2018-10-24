<template>
  <div>
    <titleBar :langTitle="$nuxt.$route.params.code ? $t('dish.updateDish') : $t('dish.createDish')" />
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$nuxt.$route.params.code ? $t('dish.updateDish') : $t('dish.createDish')}}</h5>
        <div class="heading-elements">
          <button :disabled="loading" @click="redirectTo('/dishes')" class="btn btn-default mr-1">
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
                <div :class="`form-group ${errors.has('code') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('dish.code')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="code" :disabled="$route.params.code" :placeholder="$t('dish.code')" v-validate="'required'" class="form-control" v-model="formData.code">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('name') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('dish.name')}} *</label>
                  <div class="col-lg-10">
                    <input type="text" name="name" :placeholder="$t('dish.name')" v-validate="'required'" class="form-control" v-model="formData.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('dish.unit')}}</label>
                  <div class="col-lg-10">
                    <input type="text" name="unit" :placeholder="$t('dish.unit')" class="form-control" v-model="formData.unit">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('dish.price')}}</label>
                  <div class="col-lg-10">
                    <input type="number" name="price" :placeholder="$t('dish.price')" class="form-control" v-model="formData.price">
                  </div>
                </div>
                <div :class="`form-group ${errors.has('categoryId') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('dish.category')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.categoryId"
                               filterable remote
                               v-validate="'required'"
                               name='categoryId'
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('dish.status')}}</label>
                  <div class="col-lg-10">
                    <el-select v-model="formData.status"
                               filterable remote
                               :placeholder="$t('choose')"
                               style="width:100%">
                      <el-option v-for="item in commonData.dishStatus" :key="item" :label="$t('dish.' + item)" :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-lg-2">{{$t('dish.picture')}}</label>
                  <div class="col-lg-10">
                    <img class="img-responsive" v-if="formData.pictureUrl" :src="formData.pictureUrl" style="width:256px;height:256px" />
                    <img src="~/assets/images/no-image.svg" v-else />
                  </div>
                  <div class="col-lg-12 col-lg-offset-2 mt-20">
                    <button class="btn btn-info" @click="onPickFile">{{$t('dish.choosePicture')}}</button>
                    <input class="hidden" type="file" id="file" ref="file" accept="image/*" @change="onFilePicked">
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
        commonData,
        changePicture: false,
        imageUrl: ''
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
      var categoryList = await store.dispatch('editDish/getListCategory');
      var formData = { unit: 'món', price: 10000, status: 'active', pictureUrl: ''};
      if (route.params.code) {
        formData = await store.dispatch('editDish/getDish',route.params.code);
      }
      return { formData, categoryList };
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
              let response = _this.changePicture ? await _this.$store.dispatch('editDish/editDishWithPic', _this.formData) : await _this.$store.dispatch('editDish/editDishWithoutPic', _this.formData);
              if (!response) {
                _this.redirectTo('/dishes');
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
      },
      onPickFile: function(){
        this.$refs.file.click()
      },
      onFilePicked: function(event){
        const files = event.target.files;
        let fileName = files[0].name;
        if (fileName.lastIndexOf('.') <= 0) {
          return this.$notify({ message: this.$t('dish.chooseInvalidPic') });
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', ()=>{
          this.formData.pictureUrl = fileReader.result;
        })
        fileReader.readAsDataURL(files[0]);
        this.formData.picture = files[0];
        this.changePicture = true;
      }
    }
  };
</script>
