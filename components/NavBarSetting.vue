<template>
  <div class="col-lg-3" style="padding-left: 0px !important">
    <div class="panel">
      <ul class="list-group panel-no-border" style="padding: 0 !important">
        <li>
          <nuxt-link to="/setting" class="list-group-item" active-class="active" exact>
            <span>{{$t('setting.general')}}</span>
          </nuxt-link>
          <nuxt-link to="/setting/category" class="list-group-item" active-class="active">
            <span>{{$t('setting.category')}}</span>
          </nuxt-link>
          <nuxt-link to="/setting/area" class="list-group-item" active-class="active">
            <span>{{$t('setting.area')}}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  export default {
    data() {
      return {};
    },
    computed: {},
    async created() {
    },
    methods: {

    }
  };
</script>
