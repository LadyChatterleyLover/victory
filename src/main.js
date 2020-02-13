import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "nprogress/nprogress.css"
import VueCompositionApi from '@vue/composition-api'
import VCharts from 'v-charts'

Vue.use(VCharts)
Vue.use(Antd)
Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
