import { createVuetify } from 'vuetify'
import * as all from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    directives,
    components: {
      ...labs,
      ...all
    },
    theme: {
      defaultTheme: 'dark',
    },
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
        mdi,
      }
    },
  })

  nuxtApp.vueApp.use(vuetify)
})