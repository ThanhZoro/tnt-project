<template>
  <div id="auth0-lock"/>
</template>

<script>
export default {
  layout: "blank",
  middleware: 'anonymous',
  mounted () {
    const showLogin = require('~/utils/lock').showLogin
    showLogin('auth0-lock')
  }
}
</script>
