<template>
  <div class="page-header page-header-default">
    <div class="breadcrumb-line">
      <ul class="breadcrumb">
        <li>
          <nuxt-link to="/">
            <i class="icon-home2 position-left"></i> {{$t('links.home')}}
          </nuxt-link>
        </li>
        <li class="active">{{langTitle}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
    },
    async created() {

    },
    mounted() {
    },
    props: ["langTitle"]
  }
</script>
