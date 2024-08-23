import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//Router setup
import router from './router'
app.use(router)

app.mount('#app')

