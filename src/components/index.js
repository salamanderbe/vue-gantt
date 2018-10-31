import Vue from 'vue'
import Gantt from './gantt.vue'
import flatPickr from 'vue-flatpickr-component'

// Usesages
Vue.use(require('vue-moment'))

// Styles
import 'flatpickr/dist/flatpickr.css'

Vue.component('flatPickr', flatPickr)
Vue.component('Gantt', Gantt)

export default Gantt
