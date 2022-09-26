import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/store'
import axios from 'axios'
import FlashMessage from '@smartweb/vue-flash-message'
import { VueEditor } from "vue2-editor";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'

// axios.defaults.baseURL = 'https://ccms.nugsoftdemos.net/api'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
Vue.config.performance = true
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.use(FlashMessage);
Vue.use(VueEditor);


new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
