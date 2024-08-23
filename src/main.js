import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//Router setup
import router from './router'
app.use(router)

//Pinia setup
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia);

app.mount('#app')

