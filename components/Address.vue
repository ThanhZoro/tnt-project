<template>
  <div class="el-input el-input-group el-input-group--append">
    <input name="address" :disabled="disabled" :placeholder="$t('listNotify.address')" type="text" v-model="formData.address" v-gmaps-searchbox:Address.formatted_address=vm class="el-input__inner">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          address: ''
        },
        vm: {
          Address: {}
        }
      }
    },
    watch: {
      "vm.Address.formatted_address": function (val) {
        this.formData.address = val;
      },
      "formData.address": function (val) {
        this.nameAddress(val);
      }
    },
    methods: {
      // go back page history
      nameAddress: function (val) {
        this.$emit('nameAddress', val)
      },
    },
    computed: {
    },
    async created() {
      this.formData.address = this.address;
    },
    mounted() {
    },
    props: ['address','disabled']
  }
</script>
