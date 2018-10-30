import Vue from 'vue'
import App from './App.vue'
import './styles/app.scss'

Vue.config.productionTip = false

Vue.use(require('vue-moment'));

new Vue({
  render: h => h(App)
}).$mount('#app')
