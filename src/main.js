import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Operations from './views/Operations.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Dashboard.vue') }, // You'll create this
    { path: '/operations', component: Operations }
  ]
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')