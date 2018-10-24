<template>
  <div class="col-lg-3" style="padding-left: 0px !important">
    <div class="panel">
      <ul class="list-group panel-no-border" style="padding: 0 !important">
        <li>
          <nuxt-link to="/get-posting-config" class="list-group-item" active-class="active" exact>
            <span>{{$t('screen.configGeneral')}}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/get-posting-config/fetch-config" class="list-group-item" active-class="active">
            <span>{{$t('screen.fetch')}}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/get-posting-config/same-posting-config" class="list-group-item" active-class="active">
            <span>{{$t('screen.samePosting')}}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/get-posting-config/preprocess-config" class="list-group-item" active-class="active">
            <span>{{$t('screen.preprocess')}}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/get-posting-config/priority-config" class="list-group-item" active-class="active">
            <span>{{$t('screen.priority')}}</span>
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
