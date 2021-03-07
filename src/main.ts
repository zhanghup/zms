import { createApp } from 'vue'
import App from './App.vue'
import zpx from "../packages/zpx"
import router from "./router"

let app = createApp(App)
app.use(router)
app.mount('#app')
