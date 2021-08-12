import Vue from 'vue';
import Antd from 'ant-design-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import App from './App';

import Router from './routes/index.js';

import vueResource from 'vue-resource';
Vue.use(vueResource)

// Register Vue-Router
Vue.use(VueRouter)

// import font awesome (free)
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// svg icons - add to library
library.add(faUserSecret)
// Register as a component (<font-awesome-icon/>)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

// Import antdv CSS file
import 'ant-design-vue/dist/antd.css';
// Register antdv globaly in project 
Vue.use(Antd);


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')
