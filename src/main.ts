import './assets/main.css'

import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

/* Import Toastification */
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Vuetify theme setup (opcional)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
        sets: {
      fa: {
        component: (props: any) => h('i', { class: `fa ${props.icon}` }),
      },
    },
  },
})

const app = createApp(App)
app.use(vuetify)
app.use(createPinia())
app.use(Toast)
app.use(router)
app.mount('#app')
