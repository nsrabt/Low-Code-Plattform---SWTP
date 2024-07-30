// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Import CSS
import './assets/css/app.css'

// Import store
import store from './store/store.js'

// Import Router
import router from './router'

// Import Navbar component
import Navbar from '@/components/navbar.vue'

const app = createApp(App)

// Register Navbar globally
app.component('Navbar', Navbar)

app.use(router)
app.use(store)
app.mount('#app')
