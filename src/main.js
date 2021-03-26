import Vue from 'vue'
import App from './App.vue'
import '@/test.js'
import '@/style/utils.css'


alert(1111);
new Vue({
  render:(h)=>h(App)
}).$mount('#app')

