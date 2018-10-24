import Element from 'element-ui'
import Vue from 'vue'
export default ({ app }) => {
Vue.use(Element, { i18n: (key, value) => app.i18n.t(key, value) })
}
