import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Use library to specify what icons to be bundled eventually
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faSpinner, faBroadcastTower } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import GeneralLoader from '@/components/loader/GeneralLoader'
import Message from '@/components/message/Message'

library.add(faPlay, faPause, faSpinner, faBroadcastTower)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component(GeneralLoader.name, GeneralLoader)
Vue.component(Message.name, Message)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
