import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {langEn} from "~/locales/en.js";
import {langVi} from "~/locales/vi.js";
Vue.use(VueI18n);
export default ({ app, store }) => {
	app.i18n = new VueI18n({
		locale: store.state.locale,
		fallbackLocale: 'vi',
		messages: {
      en: langEn,
      vi: langVi
    }
	});
};

