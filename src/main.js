import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Use library to specify what icons to be bundled eventually
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faSpinner, faBroadcastTower } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlay, faPause, faSpinner, faBroadcastTower)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
