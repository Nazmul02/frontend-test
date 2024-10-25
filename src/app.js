import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router' // Import the router configuration

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router, // Add the router instance to the Vue instance
  render: h => h(App)
});