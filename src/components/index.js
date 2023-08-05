import { createApp } from 'vue'
import Gantt from './gantt.vue'
import flatPickr from 'vue-flatpickr-component'

// Styles
import 'flatpickr/dist/flatpickr.css'

const app = createApp({})

app.component('flatPickr', flatPickr)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Gantt', Gantt)

export default Gantt
