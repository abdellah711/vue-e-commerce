import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import Button from './components/shared/Button.vue'
import InputField from './components/shared/InputField.vue'
import Spinner from './components/shared/Spinner.vue'

const app = createApp(App)

app.use(createPinia().use(piniaPersist))
app.use(router)

app
.component('Button',Button)
.component('InputField',InputField)
.component('Spinner',Spinner)

app.mount('#app')
