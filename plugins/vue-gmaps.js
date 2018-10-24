import Vue from 'vue';
import VueGmaps from 'vue-gmaps'
Vue.use(VueGmaps, {
  key: 'AIzaSyBpUZo6wyhpSCfcVOkiPe1E8UpaGdIl9gQ',
  libraries: ['places'],
  version: '3',
  inject: true
})
