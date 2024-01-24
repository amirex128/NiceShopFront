import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import {md3} from 'vuetify/blueprints'

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#3f51b5',
        secondary: '#00bcd4',
        accent: '#9c27b0',
        error: '#e91e63',
        warning: '#f44336',
        info: '#009688',
        success: '#2196f3'

    },
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        blueprint: md3,
        defaults: {
            VBtn: {},
            VCard: {
                elevation: 4
            },
        },
        theme: {
            defaultTheme: 'myCustomLightTheme',
            themes: {
                myCustomLightTheme,
            },
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
    })
    app.vueApp.use(vuetify)
})
