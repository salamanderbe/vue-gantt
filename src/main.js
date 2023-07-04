import { createApp } from 'vue'
import App from './App.vue'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'

import './styles/app.scss'
import 'flatpickr/dist/flatpickr.css'

const app = createApp(App)
app.config.productionTip = false

app.config.globalProperties.$filters = {
  moment(date, format) {
    return moment(date).format(format)
  },
}

app.component('flatPickr', flatPickr)
app.mount("#app")
