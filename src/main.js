import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueSweetalert2);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
