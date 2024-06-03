import { createApp } from 'vue'
import App from './App.vue'



// Import Css
import './assets/css/app.css'

// Import Router
import router from './router';

const app = createApp(App)
app.use(router)
app.mount('#app')
