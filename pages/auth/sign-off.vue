<template>
  <img src="~/assets/images/loading-image.svg" alt="">
</template>

<script>
export default {
  layout: "blank",
  mounted () {
    const unsetToken = require('~/utils/auth').unsetToken
    const logout = require('~/utils/lock').logout

    unsetToken()
    logout()
  }
}
</script>
