import Vue from 'vue'//Importation de Vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import Axios from 'axios'

export const url = 'http://localhost:3000/api/'

Vue.prototype.$http = Axios;//Déclaration globale d'Axios réutilisé dans tout le code Vue

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
