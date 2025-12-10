import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // <-- Use your real router folder

const app = createApp(App)
app.use(router)
app.mount('#app')
