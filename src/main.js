import Vue from 'vue'
import App from './App.vue'
import flatPickr from 'vue-flatpickr-component'

import './styles/app.scss'
import 'flatpickr/dist/flatpickr.css'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

Vue.component('flatPickr', flatPickr)

new Vue({
	render: h => h(App)
}).$mount('#app')
