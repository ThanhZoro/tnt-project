<template>
  <div>
    <div v-if="authSuccess"><img src="~/assets/images/loading-image.svg" alt=""></div>
    <div v-else>
      <h4>Have Problem with signin</h4>
      <nuxt-link to="/">Go to homepage</nuxt-link>
    </div>
  </div>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from "~/utils/auth";

export default {
  layout: "blank",
  async asyncData({ app, store, req }) {
    return {
      authSuccess: true
    };
  },
  data() {
    return {
      authSuccess: true
    };
  },
  async mounted() {
    var _this = this;
    const { token, secret } = extractInfoFromHash();
    if (!checkSecret(secret) || !token) {
      _this.authSuccess = false;
      console.error("Something happened with the Sign In request");
    }
    await setToken(token);
    await this.$router.push("/");
  }
};
</script>
