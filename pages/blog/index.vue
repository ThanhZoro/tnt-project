<template>
  <div>
    <titleBar :langTitle="'Dashboard'" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import titleBar from '~/components/TitleBar.vue';
export default {
  middleware: 'authenticated',
  components: {
		titleBar
  },
	computed: {
	}
};
</script>
