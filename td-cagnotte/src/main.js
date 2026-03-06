import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MyPlugin from "@/plugins/tools.js";

const app = createApp(App)

app.use(router)
app.use(MyPlugin)

app.mount('#app')
