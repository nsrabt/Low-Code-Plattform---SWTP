import { createApp } from 'vue'
import App from './App.vue'



// Import Css
import './assets/css/app.css'
//import store
import store from './store/store.js';


// Import Router
import router from './router';
import NotificationBox from "@/Pages/NotificationBox.vue";

const app = createApp(App)
app.component('NotificationBox', NotificationBox);
app.use(router)
app.use(store)
app.mount('#app')
